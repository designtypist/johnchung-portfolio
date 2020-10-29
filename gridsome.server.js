// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const pick = require('lodash.pick');
const { pathPrefix } = require('./gridsome.config')

module.exports = function (api, options) {
  api.loadSource(async actions => {

    require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
    const api_config = {
      url: process.env.ADMIN_URL,
      access_token: process.env.ACCESS_TOKEN
    }
    if (!api_config.url && !api_config.access_token) {
      throw new Error(
        "Admin URL and access token must be provided!"
      );
    }

    const [artgallery_response, software_response] = await Promise.all([
      axios.get(api_config.url + '/api/collections/get/art_galleries?token=' + api_config.access_token),
      axios.get(api_config.url + '/api/collections/get/software_proficiencies?token=' + api_config.access_token)
    ]);
    const artgallery_collection = actions.addCollection({ typeName: 'ArtGalleries' })
    const software_collection = actions.addCollection({ typeName: 'SoftwareProficiencies' })

    artgallery_response.data.entries.forEach((gallery, index) => {
      let gallery_images = []
      //gallery_images = gallery.images.map((image) => { })
      gallery.images.forEach(image => {
        gallery_images.push({
          meta: image.meta,
          path: api_config.url + image.path
        })
      })

      artgallery_collection.addNode({
        id: index,
        name: gallery.name,
        description: gallery.description,
        images: gallery_images
      })
    })

    software_response.data.entries.forEach((software, index) => {
      software_collection.addNode({
        id: index,
        name: software.name,
        icon: api_config.url + software.icon.path
      })
    })
  })
  api.loadSource(store => {
    
    /*
    Clean the pathPrefix
    ====================
    not used =>  '/'
    ''       =>  '/'
    '/'      =>  '/'
    '/path'  =>  '/path'
    'path'   =>  '/path'
    'path/'  =>  '/path'
    '/path/' =>  '/path'
    */
    const cleanedPathPrefix = `${pathPrefix ? ['', ...pathPrefix.split('/').filter(dir=>dir.length)].join('/') : ''}`

    /*
    Query
    =====
    <static-query>        <!-- or a page-query -->
    {
      metaData{
        pathPrefix
      }
    }
    </static-query>

    Requests for static files should look like this:
    ===============================================
    Using static-queries: axios( this.$static.metaData.pathPrefix + "/fileName" )
    Using page-queries,   axios( this.$page.metaData.pathPrefix   + "/fileName" )
    */
    store.addMetadata('pathPrefix', cleanedPathPrefix)
  })

  api.beforeBuild(() => {

    // Generate an index file for Fuse to search Posts
    api.loadSource(store => { 
      const posts = store.getCollection('Post').data.map(post => {
        return pick(post, ['title', 'path', 'summary']);
      });
      
      const output = {
        dir: './static',
        name: 'search.json',
        ...options.output
      }

      const outputPath = path.resolve(process.cwd(), output.dir)
      const outputPathExists = fs.existsSync(outputPath)
      const fileName = output.name.endsWith('.json')
        ? output.name
        : `${output.name}.json`

      if (outputPathExists) {
        fs.writeFileSync(path.resolve(process.cwd(), output.dir, fileName), JSON.stringify(posts))
      } else {
        fs.mkdirSync(outputPath)
        fs.writeFileSync(path.resolve(process.cwd(), output.dir, fileName), JSON.stringify(posts))
      }
    });
  })
}

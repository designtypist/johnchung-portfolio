// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const fs = require('fs');
const path = require('path');
const pick = require('lodash.pick');
const { pathPrefix } = require('./gridsome.config');

const portfolio_images = require('./content/gallery/image/portfolio_images.json');
const sketchbook_images = require('./content/gallery/image/sketchbook_images.json');
const softwares = require('./content/software_proficiency/softwares.json');

module.exports = function (api, options) {
  api.loadSource(store => {

    //Setting up the image gallery collection
    const image_gallery = store.addCollection('GalleryImages')
    let image_id = 0
    
    for (const image of portfolio_images) {
      image_gallery.addNode({
        id: image_id,
        title: image.title,
        description: image.description,
        tags: image.tags,
        gallery_type: 'portfolio',
        position: image.position,
        filename: image.source.filename,
        image: require.resolve('./src/images/portfolio/' + image.source.filename),
      })

      image_id += 1
    }

    for (const image of sketchbook_images) {
      image_gallery.addNode({
        id: image_id,
        title: image.title,
        description: image.description,
        tags: image.tags,
        position: image.position,
        gallery_type: 'sketchbook',
        filename: image.source.filename,
        image: require.resolve('./src/images/sketchbook/' + image.source.filename)
      })

      image_id += 1
    }

    //Setting up software proficiency
    const software_proficiency = store.addCollection('SoftwareProficiency')
    let software_id = 0

    for (const software of softwares) {
      software_proficiency.addNode({
        id: software_id,
        name: software.software_name,
        filename: software.filename,
        image: require.resolve('./src/images/software/' + software.filename)
      })

      software_id += 1
    }

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

  api.beforeBuild(({ config, store }) => {

    // Generate an index file for Fuse to search Posts
    const { collection } = store.getContentType('Post');

    const posts = collection.data.map(post => {
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
  })
}

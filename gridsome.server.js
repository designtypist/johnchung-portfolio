// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const fs = require('fs');
var url = require('url');
var exec = require('child_process').exec;
const path = require('path');
const axios = require('axios');
const pick = require('lodash.pick');
const { pathPrefix } = require('./gridsome.config')

module.exports = function (api, options) {
  api.loadSource(async actions => {

    //Assign and check environment variables exist
    require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
    const api_config = {
      url: process.env.ADMIN_URL,
      access_token: process.env.ACCESS_TOKEN
    }
    if (!api_config.url && !api_config.access_token) {
      throw new Error('Admin URL and access token must be provided!');
    }

    //Create GraphQL collection
    const artgallery_collection = actions.addCollection({ typeName: 'ArtGalleries' })
    const software_collection = actions.addCollection({ typeName: 'SoftwareProficiencies' })
    const about_me_collection = actions.addCollection({ typeName: 'AboutMe' })

    //API request to get contents
    const [artgallery_response, software_response, about_me_response] = await Promise.all([
      axios.get(api_config.url + '/api/collections/get/art_galleries?token=' + api_config.access_token),
      axios.get(api_config.url + '/api/collections/get/software_proficiencies?token=' + api_config.access_token),
      axios.get(api_config.url + '/api/singletons/get/about_me_page?token=' + api_config.access_token)
    ]);

    //Import contents from the API request to the GraphQL collections
    artgallery_response.data.entries.forEach((gallery, index) => {
      gallery.images.forEach(image_contents => {

        let DOWNLOAD_DIR = './static/downloads/gallery_images/'
        
        // This step is not required if you have manually created the directory
        let mkdir = 'mkdir -p ' + DOWNLOAD_DIR
        let child = exec(mkdir, function(err, stdout, stderr) {
          if (err) throw err;
          else download_file_wget(api_config.url + image_contents.path)
        })

        // Function for downloading file using wget
        let download_file_wget = function(file_url) {
          // extract the file name
          let file_name = url.parse(file_url).pathname.split('/').pop()
          //if file exist then don't download
          if (fs.existsSync(DOWNLOAD_DIR + file_name)) {
            console.log(file_name + " file exists already in the " + DOWNLOAD_DIR + " so the download was cancelled")
          } else {
            // compose the wget command
            let wget = 'wget -P ' + DOWNLOAD_DIR + ' ' + file_url
            // excute wget using child_process' exec function
          
            let child = exec(wget, function(err, stdout, stderr) {
              if (err) throw err
              else console.log(file_name + ' downloaded to ' + DOWNLOAD_DIR)
            })
          }
        }

        let image_file = image_contents.path.split(/[/]+/).pop()
        image_contents['filename'] = image_file
        image_contents['local_path'] = '/downloads/gallery_images/' + image_file
        image_contents['remote_path'] = api_config.url + image_contents.path
      })

      artgallery_collection.addNode({
        id: index,
        name: gallery.name,
        description: gallery.description,
        images: gallery.images
      })
    })
    
    software_response.data.entries.forEach((software, index) => {
      // Make directory if it doesn't already exist
      let DOWNLOAD_DIR = './static/downloads/software_icons/'
      let mkdir = 'mkdir -p ' + DOWNLOAD_DIR
      let child = exec(mkdir, function(err, stdout, stderr) {
        if (err) throw err;
        else download_file_wget(api_config.url + software.icon.path)
      })

      // Function for downloading file using wget
      let download_file_wget = function(file_url) {
        // extract the file name
        let file_name = url.parse(file_url).pathname.split('/').pop()
        //if file exist then don't download
        if (fs.existsSync(DOWNLOAD_DIR + file_name)) {
          console.log(file_name + " file exists already in the " + DOWNLOAD_DIR + " so the download was cancelled")
        } else {
          // compose the wget command
          let wget = 'wget -P ' + DOWNLOAD_DIR + ' ' + file_url
          // excute wget using child_process' exec function
        
          let child = exec(wget, function(err, stdout, stderr) {
            if (err) throw err
            else console.log(file_name + ' downloaded to ' + DOWNLOAD_DIR)
          })
        }
      }
      
      //Create the software key and value pairs
      let image_file = software.icon.path.split(/[/]+/).pop()
      software['filename'] = image_file
      software['local_path'] = '/downloads/software_icons/' + image_file
      software['remote_path'] = api_config.url + software.icon.path

      software_collection.addNode({
        id: index,
        name: software.name,
        filename: software.filename,
        local_path: software.local_path,
        remote_path: software.remote_path,
      })
    })
    
    about_me_collection.addNode({
      description: about_me_response.data.description,
      resume_link: about_me_response.data.resume_link,
      demo_reel_link: about_me_response.data.demo_reel_link
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

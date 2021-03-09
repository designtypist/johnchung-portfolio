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

//Helper functions
// Function to make directory if it doesn't already exist
function mkdir_download_dir(DOWNLOAD_DIR) {
  let mkdir = 'mkdir -p ' + DOWNLOAD_DIR
  let child = exec(mkdir, function(err, stdout, stderr) {
      if (err) throw err;
      else console.log('directory already exist')
  })
}

// Function for downloading file using wget
function download_file_wget(FILE_URL, DOWNLOAD_DIR) {
  // extract the file name
  let file_name = url.parse(FILE_URL).pathname.split('/').pop()
  //if file exist then don't download
  if (fs.existsSync(DOWNLOAD_DIR + file_name)) {
      console.log(file_name + " file exists already in the " + DOWNLOAD_DIR + " so the download was cancelled")
  } else {
      // compose the wget command
      let wget = 'wget -P ' + DOWNLOAD_DIR + ' ' + FILE_URL
      // excute wget using child_process' exec function

      let child = exec(wget, function(err, stdout, stderr) {
      if (err) throw err
      else console.log(file_name + ' downloaded to ' + DOWNLOAD_DIR)
      })
  }
}

module.exports = function (api, options) {
  api.loadSource(async actions => {
    //Assign and check environment variables exist
    require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
    const api_config = {
      url: process.env.API_URL,
      auth_key: process.env.AUTH_KEY
    }
    if (!api_config.url && !api_config.auth_key) {
      throw new Error('API URL and access token must be provided!');
    }

    //Create GraphQL collection
    const portfolio_collection = actions.addCollection('PortfolioGallery')
    const personal_collection = actions.addCollection('PersonalGallery')
    const software_collection = actions.addCollection('Software')
    const aboutme_collection = actions.addCollection('AboutMe')
    const socialmedia_collection = actions.addCollection('SocialMedia')

    //API request to get contents
    const response = await axios.post(api_config.url, {
      query:
        `{
          galleryTypes {
            edges {
              node {
                name
                slug
                mediaItems {
                  edges {
                    node {
                      title
                      sourceUrl
                    }
                  }
                }
              }
            }
          }
          pages {
            edges {
              node {
                title
                aboutMe {
                  description
                  demoReelLink
                  resumeLink
                }
              }
            }
          }
          socials {
            edges {
              node {
                social {
                  id
                  brand
                  link
                }
              }
            }
          }
        }`
      }, {
        headers: {
          'Content-Type': 'application/json',
          //Authorization: 'Bearer {token}'
        }
      }
    )
    .then(function (result) {
      result.data.data.galleryTypes.edges.forEach((node) => {
        if(node.node.name == 'Portfolio') {
          node.node.mediaItems.edges.forEach((node, index) => {
            portfolio_collection.addNode({
              id: index,
              name: node.node.title,
              image_url: node.node.sourceUrl
            })
          })
        } else if(node.node.name == 'Personal') {
            node.node.mediaItems.edges.forEach((node, index) => {
              personal_collection.addNode({
                id: index,
                name: node.node.title,
                image_url: node.node.sourceUrl
              })
            })
        } else if(node.node.name == 'Software Proficiency') {
            node.node.mediaItems.edges.forEach((node, index) => {
              software_collection.addNode({
                id: index,
                name: node.node.title,
                icon_url: node.node.sourceUrl
              })
            })
        }
      });

      result.data.data.pages.edges.forEach((node, index) => {
        if(node.node.title == 'About Me') {
          aboutme_collection.addNode({
            id: index,
            description: node.node.aboutMe.description,
            resume_link: node.node.aboutMe.resumeLink,
            demo_reel_link: node.node.aboutMe.demoReelLink
          })
        }
      })

      result.data.data.socials.edges.forEach((node) => {
        socialmedia_collection.addNode({
          id: node.node.social.id,
          brand: node.node.social.brand.toLowerCase(),
          link: node.node.social.link
        })
      })
    })
    .catch(function (error) {
      console.log(error);
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

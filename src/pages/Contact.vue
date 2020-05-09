<template>
  <Layout>

    <div class="container mx-auto overflow-x-hidden">
      <div class="flex flex-wrap pt-12">
        <div class="w-1/4 mx-4">
          <g-image src="../../static/contact_info.png" alt="Contact Info" width="250" />
        </div>
        <div class="w-1/2 text-xl pb-4 relative">
          <h2 class="font-bold mb-1 uppercase text-green-700 text-2xl" id="contact">Contact Me</h2>
        
          <div class="absolute right-0 top-0" style="transform: translate(100%) rotate(180deg)">
            <svg width="170px" height="170px"><use xlink:href="#dots-triangle" /></svg>
          </div>
          
          <p class="mb-12">Have a question for me or a work inquiry well then feel free to drop in a line.</p>

          <div class="w-full text-lg sm:text-lg mb-16">
            <form action="#" class="mb-6">
              <div class="mb-2 -mx-4">
                  <div class="mb-2 px-4">
                      <!--<label class="block mb-2 text-copy-primary" for="name">
                          Name
                      </label>-->
                      <input type="text" name="name" id="name" placeholder="NAME" class="block w-full bg-background-form border border-border-color-primary shadow rounded outline-none focus:border-green-700 mb-2 p-4" required>
                  </div>

                  <div class="mb-2 px-4">
                      <!--<label class="block text-copy-primary mb-2" for="email">
                          Email Address
                      </label>-->
                      <input type="email" name="email" id="email" placeholder="EMAIL"  class="block w-full bg-background-form border border-border-color-primary shadow rounded outline-none focus:border-green-700 mb-2 p-4" required>
                  </div>
                   <div class="mb-2 px-4">
                    <!--<label class="block text-copy-primary mb-2" for="message">
                        Message
                    </label>-->

                    <input type="text" name="subject" id="subject" placeholder="SUBJECT"  class="block w-full bg-background-form border border-border-color-primary shadow rounded outline-none focus:border-green-700 mb-2 p-4" required>
                  </div>
                  <div class="mb-4 px-4">
                    <!--<label class="block text-copy-primary mb-2" for="message">
                        Message
                    </label>-->

                    <textarea id="message" rows="5" name="message" class="block w-full bg-background-form border border-border-color-primary shadow rounded outline-none appearance-none focus:border-green-700 mb-2 px-4 py-4" placeholder="MESSAGE" required></textarea>
                  </div>
              </div>

              <div>
                  <input type="submit" value="Submit" class="block bg-green-700 hover:bg-green-800 text-white text-sm font-semibold tracking-wide uppercase shadow rounded cursor-pointer px-6 py-3">
              </div>
          </form>
          </div>
        </div>
      </div>
    </div>

  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'Contact'
  }
}
</script>

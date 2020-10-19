<template>
  <Layout>

    <div class="container-inner mx-auto">
      <div class="flex flex-wrap md:mx-0 mx-4">
        <div class="w-1/4 lg:inline-block hidden">
          <g-image class="lg:mx-auto p-4" src="~/images/contact_info.png" alt="Contact Info" width="250" />
        </div>
        <div class="lg:w-1/2 w-full relative">
          <h2 class="font-bold mb-1 uppercase text-green-700 text-2xl" id="contact">Contact Me</h2>
        
          <div class="absolute right-0 top-0 lg:inline hidden" style="transform: translate(100%) rotate(180deg)">
            <svg width="170px" height="170px"><use xlink:href="#dots-triangle" /></svg>
          </div>
          
          <p class="mb-12">Have a question for me or a work inquiry well then feel free to drop in a line.</p>

          <div class="text-md mb-12">
            <form name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field">
              <input type="hidden" name="form-name" value="contact" />
              <div class="mb-2 -mx-4 text-black">
                  <div class="flex mb-2 px-4">
                    <label class="w-1/5 uppercase text-copy-primary font-bold mb-2" for="name">Name</label>
                    <input type="text" name="name" id="name" placeholder="John Doe" required
                      class="w-4/5 bg-background-form border border-border-color-primary shadow rounded outline-none focus:border-green-700 mb-2 p-2" />
                  </div>
                  <div class="flex mb-2 px-4">
                    <label class="w-1/5 uppercase text-copy-primary font-bold mb-2" for="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="johndoe@example.com" required
                      class="w-4/5 bg-background-form border border-border-color-primary shadow rounded outline-none focus:border-green-700 mb-2 p-2" />
                  </div>
                   <div class="flex mb-2 px-4">
                    <label class="w-1/5 uppercase text-copy-primary font-bold mb-2" for="subject">Subject</label>
                    <input type="text" name="subject" id="subject" placeholder="Art" required
                      class="w-4/5 bg-background-form border border-border-color-primary shadow rounded outline-none focus:border-green-700 mb-2 p-2" />
                  </div>
                  <div class="flex mb-2 px-4">
                    <label class="w-1/5 uppercase text-copy-primary font-bold mb-2" for="message">Message</label>
                    <textarea id="message" rows="5" name="message" placeholder="I love art" required
                      class="w-4/5 bg-background-form border border-border-color-primary shadow rounded outline-none appearance-none focus:border-green-700 mb-2 px-4 py-2"></textarea>
                  </div>
                  
              </div>
              <div class="flex mb-2 px-4">
                <div class="w-1/5"></div>
                <div class="w-4/5" data-netlify-recaptcha="true"></div>
              </div>
              <div class="flex mb-2 px-4">
                <div class="w-1/5"></div>
                <div class="w-4/5">
                  <input type="submit" value="Submit"
                    class="bg-green-700 hover:bg-green-800 text-white text-sm font-semibold tracking-wide uppercase shadow rounded cursor-pointer px-6 py-3" />
                </div>
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

<template>
  <div>
    <Navbar :menus="menus"/>
    <div class="container">
      <form class="w-full max-w-xs">
        <div class="md:flex md:items-center mb-6">
          <div class>
            <h4>{{ currentPost.title }}</h4>
          </div>
        </div>
        <div class>
          <div class>
            <div
              id="content"
              class="quill-editor"
              :content="currentPost.content"
              @change="onEditorChange($event)"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)"
              v-quill:myQuillEditor="editorOption"
            ></div>
            <br>
            <div class="content" id="disqus_thread"></div>
            <!-- <textarea
              id="inline-post-content"
              v-model="content"
              class=""
              type="text"
            />-->
          </div>
        </div>

      </form>
    </div>
    <Footer/>
  </div>
</template>
<style lang="scss" scoped>
.container {
  width: 60%;
  margin: 0 auto;
  padding: 4rem 0;
  .quill-editor {
    min-height: 200px;
    max-height: 400px;
    overflow-y: auto;
  }
}
</style>
<script type="text/javascript">
import Navbar from '~/components/NavbarBS.vue'
import Footer from '~/components/Footer.vue'
export default {
  components: {
    Navbar,
    Footer
  },
  mounted() {
    console.log('app init, my quill instance object is:', this.myQuillEditor)
    this.myQuillEditor.disable()
    this.post_id = this.$nuxt._route.params.id
    this.$store.dispatch('posts/GET_POST', this.post_id)

    // load disqus comments below
    /**
    *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
    *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables*/

    var disqus_config = function () {
    this.page.url = window.location;  // Replace PAGE_URL with your page's canonical URL variable
    this.page.identifier = this.href.substr(this.href.lastIndexOf('/') + 1); // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    };
    (function() { // DON'T EDIT BELOW THIS LINE
    var d = document, s = d.createElement('script');
    s.src = 'https://lesspod.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
    })();
  },
  computed: {
    menus() {
      // return this.$store.state.menus.menuItems
      return this.$store.state.menus.menuItems
    },
    posts() {
      // return this.$store.state.menus.menuItems
      return this.$store.state.posts.posts
    },
    currentPost() {
      // return this.$store.state.menus.menuItems
      return this.$store.state.posts.currentPost
    }
  },
  methods: {
    savePost: function() {
      var titl = document.getElementById('inline-post-title')
      var cont = document.getElementsByClassName('ql-editor')
      cont = cont[0].innerHTML
      titl = titl.value
      console.log('saving content: ' + cont + '... title: ' + titl)

      if (titl && titl.length > 0) {

        // this.posts.push({ _id: id, title: this.title })
        var post = {
          _id: this.post_id,
          title: titl,
          content: cont,
          author: 'Rajan Chandi'
        }

        this.$axios.put('/api/post/' + this.post_id, post)
        // this.$store.commit('posts/update', post)
      }
    },
    addPost: function() {
      console.log('addPost called')
      // alert(
      //   'post added with title: ' + this.title + ' content: ' + this.content
      // )
      if (this.title && this.title.length > 0) {
        this.$axios.post('/api/post', {
          title: this.title,
          content: this.content,
          author: this.author
        })
        var id = Math.floor(Math.random() * 100 + 4)
        // this.posts.push({ _id: id, title: this.title })
        var post = {
          _id: id,
          title: this.title,
          content: this.content,
          author: 'Jason Bourne'
        }
        this.$store.commit('posts/add', post)
        this.title = ''
        this.content = ''
      }
    },
    onEditorBlur(editor) {
      console.log('editor blur!', editor)
    },
    onEditorFocus(editor) {
      console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      console.log('editor ready!', editor)
    },
    onEditorChange({ editor, html, text }) {
      console.log('editor change!', editor, html, text)
      this.content = html
    }
  },
  async asyncData(context) {
    // called every time before loading the component
    // as the name said, it can be async
    // Also, the returned object will be merged with your data object

    return {
      title: '',
      content: '<p>I am Example</p>',
      post_id: '',
      editorOption: {
        // some quill options
        modules: {
          toolbar: false
        }
      }
    }
  }
}
</script>

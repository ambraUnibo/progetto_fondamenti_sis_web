
// Pagina 1 - Approfondimento sull'accessibilità (introduzione, wcag, ux/usability)
const staticPage1 = {
  data() {
    return {
      Articles: null
    }
  },
  template: `
  <div id="staticPage1">
    <h1>Accessibilità</h1>
    <article v-for="article in Articles" class="art-sp">
      <h2 class="h2-sp1">{{article.title}}</h2>
      <img :src="article.img" alt="" />
      <div id="div-sp1">
        <p v-for="paragraph in article.content">{{paragraph}}</p>
      </div>
    </article>
  </div>
  `,
  mounted(){
    axios.get("./data/articles_staticPage1.json")
      .then(response => {
        this.Articles = response.data;
      })
      .catch(error => {
        console.error("Errore durante il recupero dei dati dell\'articolo dal file json", error);
      });
  }
};

// Pagina 2 - Approfondimento sull'accessibilità (layout, colore, tipografia)
const staticPage2 = {
  data() {
    return {
      Articles: null
    }
  },
  template: `
    <div id="staticPage2">
      <h1>Elementi di Design</h1>
      <article class="intro">
        <p>All'interno di una pagina web ci possono essere vari aspetti con un impatto significativo sull'accessibilità, in particolare per le persone con disabilità visive o con difficoltà di distinzione dei colori.</p>
        <p>In questo articolo andiamo ad approfondire quello di tre aspetti, tutti legati al design: il layout degli elementi nella pagina, la scelta e l'accostamento dei colori e infine la selezione dei font utilizzati.</p>
      </article>
      <section v-for="article in Articles" class="art-sp">
        <h2>{{article.title}}</h2>
        <article v-for="content in article.content">
          <h3>{{content.subtitle}}</h3>
          <p>{{content.paragraph}}</p>
          <figure v-if="content.img">
            <img :src="content.img" alt="content.alt" />
            <figcaption>{{content.desc}}</figcaption>
          </figure>
        </article>
      </section>
    </div>
  `,
  mounted(){
    axios.get("./data/articles_staticPage2.json")
      .then(response => {
        this.Articles = response.data;
      })
      .catch(error => {
        console.error("Errore durante il recupero dei dati dell\'articolo dal file json", error);
      })
  }
};

// Pagina 3 - Visualizzazione dati JSON
const dynamicPage1 = {
  data(){
    return {
      Contacts: null
    }
  }, 
  template: `
    <section id="dynamicPage1">
      <div id="table-container">
        <table>
          <caption>Lista Contatti</caption>
          <tr id="first-row">
              <th id="id">Id</th>
              <th id="name">Name</th>
              <th id="email">E-mail</th>
              <th id="phone">Phone Number</th>
          </tr>
          <tr v-for="contact in Contacts" class="row">
              <td class="id">{{contact.id}}</td>
              <td class="name">{{contact.name}}</td>
              <td class="email">{{contact.email}}</td>
              <td class="phone">{{contact.phone}}</td>
          </tr>    
        </table>
      </div>
    </section> `,
  methods: {
    getContacts: function(){
      axios.get('./data/contacts.json')
        .then(response => {            
          this.Contacts = response.data
        });
    }
  },
  mounted(){
      this.getContacts()
  }
}

// Pagina 4 - CRUD dei dati
const dynamicPage2 = { 
  data(){
    return{
      people: [
        { name: "Marco", surname: "Rossi" }, 
        { name : "Luca", surname : "Bianchi" }, 
        { name : "Giulia", surname : "Ferrari" },
        { name : "Andrea", surname : "Marchi" },
        { name : "Filippo", surname : "Veronesi" },
        { name : "Tommaso", surname : "Boschi" },
        { name : "Caterina", surname : "Casadei" } 
      ],
      selected:0
    }
  },
  template: `
    <div id="dynamicPage2">
      <div id="div-list">
        <h1>Lista Persone</h1>
        <ul id="ul-list">
          <li v-for="person in people">{{person.name + " " + person.surname}}</li>
        </ul>
      </div>
      <form>
        <h2>Modifica Persona</h2>
        <ul id="ul-modify">
          <li>
            <label for="selected_person">Seleziona la persona da modificare:</label>
            <select id="selected_person" v-model="selected">
              <option v-for="(person, index) in people" v-bind:value="index">{{person.name + " " + person.surname}}</option>
            </select>   
          </li>
          <li>
            <label for="name">Sostituisci con il nuovo nome:</label>
            <input v-model="people[selected].name" type="text" name="name" id="name"/>    
          </li>
          <li>
            <label for="surname">Sostituisci con il nuovo cognome:</label>
            <input v-model="people[selected].surname" type="text" name="surname" id="surname"/>    
          </li>
        </ul>
      </form>
    </div>
  `,
  mounted(){}
};

// Funzione per la gestione delle rotte
const routes = [
  { path: '/', component: staticPage1 },
  { path: '/elementi-di-design', component: staticPage2 },
  { path: '/lista-contatti', component: dynamicPage1 },
  { path: '/modifica-persona', component: dynamicPage2 }
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: routes,
})

const app = Vue.createApp({})
app.use(router)
app.mount('#app')

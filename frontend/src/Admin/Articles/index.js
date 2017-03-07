import React from 'react'
import Article from './Article'
import ContentImages from '../Images/ContentImages'
import { connect } from 'react-redux'
import { firebase, helpers } from 'react-redux-firebase'
const { isLoaded, isEmpty,dataToJS } = helpers
import Select from 'react-select';
import RichEditor from '../RichEditor';
import Regexify from "../../GlobalComponents/Regexify";
import Dateify from "../../GlobalComponents/Dateify";

class ArticlesContainer extends React.Component {
 constructor(props) {
  super(props)
  this.state = {
   selectedImage: null,
   selectedCategory: "Ingen kategori",
   title: "",
   content: null,
   rawHTML: null
  }
 }
 //////////////////////////////////////////
 // Vald bild
 //////////////////////////////////////////
  selectImage(image) {
   this.setState({
    selectedImage: image
   })
  }
  //////////////////////////////////////////
  // Kategori
  //////////////////////////////////////////
  selectCategory(val) {
   var selectedCategory;
   if(val === null) {
     selectedCategory = "Ingen kategori"
   } else {
     selectedCategory = val.value
   }
  this.setState({selectedCategory})
  }
  //////////////////////////////////////////
  // Draft.js innehåll
  //////////////////////////////////////////
  content(content,rawHTML) {
   this.setState({content,rawHTML})
   localStorage.setItem("draft",content);
  }
  render () {

   //////////////////////////////////////////
   // Destructors
   //////////////////////////////////////////
   const { selectedImage, selectedCategory, content,rawHTML, title} = this.state;
   const { firebase, articles, categorys } = this.props;

   //////////////////////////////////////////
   // Firebase Lägg till artikel
   //////////////////////////////////////////
   const handleAdd = () => {
      const { title } = this.refs
      if(title.value !== "" && rawHTML && content) {
       firebase.push('/articles', {
        date: Dateify(new Date()),
        created: Date.now(),
        title: title.value,
        url: Regexify(title.value),
        rawHTML: rawHTML,
        content: content,
        category: selectedCategory,
        image: selectedImage,
        edit: false
        })
      }
      title.value = '';
    /////////////////////////////////////////////
    // Uppdatera antal inlägg per kategori
    /////////////////////////////////////////////
    firebase.set(`/categorys/${selectedCategory}/count`, categorys[selectedCategory].count += 1 );
    }
    /////////////////////////////////////////////
    // React select
    /////////////////////////////////////////////
    var selectOptions = [];
    const categoryList = (!isLoaded(categorys))
                        ? 'Loading'
                        : (isEmpty(categorys))
                          ? 'Inga kategorier skapade'
                          : Object.keys(categorys).map( (key, index) => {
                           var category = {
                            value: key,
                            label: `${categorys[key].name} (${categorys[key].count}) inlägg`
                           }
                           selectOptions.push(category)
                          })
    /////////////////////////////////////////////
    // Artikel förhandsvisning
    /////////////////////////////////////////////
    const articleArray = [];
    var articleList = "Laddar"
    if(
     (isLoaded(articles) && !isEmpty(articles)) &&
     (isLoaded(categorys) && !isEmpty(categorys))
     ) {
     for(var key in articles) {
      articleArray.push(Object.assign({},articles[key],{
       key: key,
       category: articles[key].category,
       categoryName: categorys[articles[key].category].name,
       url: key
      }))
     }
     articleArray.sort((a,b) => new Date(b.created) - new Date(a.created));
     // console.log(articleArray);
    articleList = articleArray.map((article,i) =>
     <Article
      key={i}
      id={i}
      article={article}
      categorys={categorys}
      />
     )
    }
     /////////////////////////////////////////////
     // Lägg till knapp
     /////////////////////////////////////////////
     // console.log(selectedCategory,"selectedCategory");
     // console.log(title,"selectedCategory");
     const button = (selectedCategory !== "Ingen kategori" && title !== "") ?
     <button className="A-btn--add" onClick={handleAdd}>Skapa artikel</button> :
     <button className="A-btn--disabled" >Skapa artikel</button>

    return (
      <div className="A-block">
       <section className="Articles-container">
       <h1>Artiklar</h1>

        <div className="A-input-row">
        <div className="A-input-row-icon">
        <i className="flaticon-header"></i>
        </div>
         <div className="A-input-row-input">
           <label>Rubrik</label>
           <input type='text' ref='title' onChange={(e) => this.setState({title: e.target.value})} />
           <span></span>
          </div>
        </div>
        <div className="A-input-row">
         <div className="A-input-row-icon">
         <i className="flaticon-folded-newspaper"></i>
         </div>
         <div className="A-input-row-input">
           <label>Innehåll</label>
           {/* {console.log(this.content)} */}
           <RichEditor
            content={this.content.bind(this)}
            draft={localStorage.getItem("draft")}
            />
          </div>
        </div>
        <div className="A-input-row">
         <div className="A-input-row-icon">
          <i className="flaticon-share"></i>
         </div>
         <div className="A-input-row-input">
          <label>Kategori</label>
           <Select
               name="form-field-name"
               value={ selectedCategory!=="Ingen kategori satt" ? selectedCategory : "Ingen kategori satt" }
               options={selectOptions}
               onChange={ (val) => this.selectCategory(val) }
               placeholder = "Välj kategori för artikel"
           />
          </div>
        </div>
        <div className="A-input-row">
         <div className="A-input-row-icon">
          <i className="flaticon-picture"></i>
         </div>
         <div className="A-input-row-input">
         <label>Tillgängliga bilder</label>
         <ContentImages selectImage={this.selectImage.bind(this)}/>
          </div>
        </div>
        <span onClick={() => localStorage.setItem("draft",false)}>
         {button}
        </span>
        </section>
        <h2 className="A-block-header-2">Alla artiklar</h2>
        <section className="A-cols">
        {articleList}
       </section>
      </div>
    )
  }
}
//////////////////////////////////////////
// FIREBASE REDUX
//////////////////////////////////////////
const Articles = firebase([
  '/articles#orderByKey',
  '/categorys'
])(ArticlesContainer)
export default connect(
  ({firebase},state) => ({
    articles: dataToJS(firebase, 'articles'),
    categorys: dataToJS(firebase, 'categorys')
  })
)(Articles)

import React from 'react'
import { connect } from 'react-redux'
import { firebase, helpers } from 'react-redux-firebase'
import Select from 'react-select';
import RichEditor from '../RichEditor';
const { isLoaded, isEmpty,  dataToJS } = helpers
import ContentImages from '../Images/ContentImages'
import Regexify from "../../GlobalComponents/Regexify";
import Dateify from "../../GlobalComponents/Dateify";
import Modal from "../../GlobalComponents/Modal";

class EditArticleContainer extends React.Component {
 constructor(props) {
  super(props)
  this.state = {
   selectedImage: null,
   initialCategory: "",
   selectedCategory: "",
   categoryChanged: false,
   fetchedInititalCategorys: false,
   content: null,
   rawHTML: null,
   modal: false
  }
 }
 selectImage(image) {
  this.setState({
   selectedImage:image
  })
 }
 selectCategory(val, initialCategory) {
  var selectedCategory;
  if(val === null) {
    selectedCategory = "Ingen kategori"
  } else {
    selectedCategory=val.value
  }
 this.setState({ selectedCategory,initialCategory, categoryChanged: true})
 }
 content(content,rawHTML) {
  this.setState({content,rawHTML})
 }
 //////////////////////////////////////////
 // Modal
 //////////////////////////////////////////
 showModal() {
  this.setState({modal: true})
 }

render(){
     const { firebase, params, articles, categorys }=this.props;
     var article;
     var articleOutput = "Laddar artikel";
     const { selectedImage, selectedCategory,categoryChanged,content, rawHTML,modal}=this.state;

    //////////////////////////////////////////
    // Redigera funktion
    //////////////////////////////////////////
     const handleEdit = () => {
        let key = params[0];
        const { title,  date, edit, defaultImage, oldCategory, created}=this.refs
        if(typeof(selectedCategory) === "string") {

          firebase.set(`/articles/${key}/`, {
            title: title.value,
            url: Regexify(title.value),
            content: content,
            rawHTML: rawHTML,
            category: categoryChanged ? selectedCategory : oldCategory.value,
            date: date.value,
            created: parseInt(created.value),
            edit: true,
            edited: Dateify(new Date()),
            image: selectedImage !== null ? selectedImage : defaultImage.value
          })
          this.showModal()

        } else {
         // console.log("kom inte in!");
        }
        ///////////////////////////////////////////////////////////
        // Uppdatera antal inlägg per kategori
        // om kategorin har ändrats
        ///////////////////////////////////////////////////////////
        if(categoryChanged === true && selectedCategory !== oldCategory.value) {
              firebase.set(`/categorys/${oldCategory.value}/count`, categorys[oldCategory.value].count -= 1 );
              firebase.set(`/categorys/${selectedCategory}/count`, categorys[selectedCategory].count += 1 );
        }
      }
      /////////////////////////////////////////////
      // React select
      /////////////////////////////////////////////
      var selectOptions = [];
      var categoryList = (!isLoaded(categorys))
                          ? 'Loading'
                          : (isEmpty(categorys))
                            ? 'Inga kategorier skapade'
                            : Object.keys(categorys).map( (key) => {
                             selectOptions.push({
                               value: key,
                               label: categorys[key].name
                             })
                            })
     //////////////////////////////////////////
     // Artikel
     //////////////////////////////////////////
     if( (typeof(articles)!=="undefined") && (typeof(categorys) !== "undefined")) {
      article = articles[params[0]]
      articleOutput =
      <section className="Articles-container">
        <h1 className="A-block-header-1">Redigera <i>{article.title}</i></h1>
       <div className="A-input-row">
        <div className="A-input-row-icon">
         <i className="fa fa-camera-retro"></i>
        </div>
        <div className="A-input-row-input">
         <label>Rubrik</label>
         <input type="text" defaultValue={article.title} ref='title'/>
         </div>
       </div>
       <div className="A-input-row">
        <div className="A-input-row-icon">
         <i className="fa fa-camera-retro"></i>
        </div>
        <div className="A-input-row-input">
        <label>Innehåll</label>
        <RichEditor
         content={this.content.bind(this)}
         defaultContent={article.content}
         draft={false}
         />
         </div>
       </div>
       {
        article.image ? <div className="A-input-row">
                        <div className="A-input-row-icon">
                         <i className="fa fa-camera-retro"></i>
                        </div>
                        <div className="A-input-row-input">
                        <label>Nuvarande bild</label>
                        <div className="Article-edit-image"> <img src={process.env.PUBLIC_URL+"/uploads/"+article.image} alt={article.image} />
                        </div>
                         </div>
                       </div> : null
       }

       <div className="A-input-row">
        <div className="A-input-row-icon">
         <i className="fa fa-camera-retro"></i>
        </div>
        <div className="A-input-row-input">
        <label>Kategori</label>
        <Select
            name="form-field-name"
            value={ categoryChanged ? selectedCategory :
                      typeof(article.category) !== "undefined" ?
                      article.category : "Ingen kategori"  }
            options={selectOptions}
            onChange={(val) => this.selectCategory(val, article.category) }
            placeholder="Välj kategori för artikel"
        />
          <input type="hidden" defaultValue={article.date} ref="date"/>
          <input type="hidden" defaultValue={article.edit} ref="edit"/>
          <input type="hidden" defaultValue={article.image} ref="defaultImage"/>
          <input type="hidden" defaultValue={article.created} ref="created"/>
          <input type="hidden" value={article.category}  ref="oldCategory" readOnly/>
          <input type="hidden" value={selectedCategory} ref="newCategory" readOnly/>
         </div>
       </div>

       <div className="A-input-row">
        <div className="A-input-row-icon">
         <i className="fa fa-camera-retro"></i>
        </div>
        <div className="A-input-row-input">
        <label>Tillgängliga bilder</label>
        <ContentImages selectImage={this.selectImage.bind(this)}/>
         </div>
       </div>
       <button className="A-btn--update" onClick={handleEdit}>Uppdatera artikel</button>
       {
        modal ? <Modal closeModal={()=>
         this.setState({modal: false})}
         header={`Framgång!`}
         message={`Artikeln har redigerats!`}/> : null
       }
      </section>
     }
    return (
      <div className="A-block">
       {articleOutput}
      </div>
    )
  }
}
const EditArticles = firebase([
 '/articles',
 '/categorys'
])(EditArticleContainer)
export default connect(
  ({firebase}) => ({
   articles: dataToJS(firebase, 'articles'),
   categorys: dataToJS(firebase, 'categorys')
  })
)(EditArticles)

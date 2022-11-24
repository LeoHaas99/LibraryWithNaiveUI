import axios from "axios";
import { useMessage } from "naive-ui";
import Autor from "../interfaces/Autor";
import Buch from "../interfaces/Buch";
import router from '../router/index'

export class Services {
  public message = useMessage()
  public route = "http://localhost:5000"
  public errorMessage = "";
  //General Get-Call
  public get(apiCall: string, params: any) {
    console.log(params)
    return new Promise(async (resolve, reject) => {
      // GET request using fetch with error handling
       axios.get(this.route + apiCall,
        {
          params: params
        }).catch((error) => {
          this.errorMessage = error;
          console.error("There was an error!", error.message);
          this.message.error('Ein Fehler ist aufgetreten')
        }).then((response: any)=>{
          console.log(response.data)
          resolve(response.data)
        })





    })
  }
  public createBook(title: string, author: number, pages: number, language: number, image: string) {

    // POST request using axios with set headers
    const book = {
      title: title,
      author: author,
      pages: pages,
      language: language,
      image: image,
    };
    axios.post(this.route + "/library", book)
      .then(response => {
        router.push("/")
      });
  }

  public delete(apiCall: string, imageUrl: string | null) {
    console.log(this.route + apiCall)
    axios
      .delete(this.route + apiCall)
      .then((response) => {
        console.log(response)
        if (imageUrl) {
          axios
            .delete(this.route + "/remove" + imageUrl)
            .then((response) => {
              console.log(response)
            });

        }
        router.back()
      });
  }

  public editBook(book: Buch) {

    // POST request using axios with set headers
    const Book = {
      title: book.Buchtitel,
      author: book.AutorId,
      pages: book.Seitenzahl,
      language: book.SpracheId,
      image: book.BildUrl,
    };
    axios.put(this.route + "/library/" + book.BuchId, Book)
      .then(response => {
        router.back()
      });
  }

  public createAuthor(author: string) {

    // POST request using axios with set headers
    const Author = {
      author: author
    };
    axios.post(this.route + "/authors", Author)
      .then(response => {
        router.push("/authors")
      });
  }

  public editAuthor(autor: Autor) {

    // POST request using axios with set headers
    const Author = {
      author: autor.Autor
    };
    axios.put(this.route + "/authors/" + autor.AutorId, Author)
      .then(response => {
        router.back()
      });
  }

}
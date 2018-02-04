 import marked from 'marked';
class ArticleCtrl {
  constructor(article,User, $sce,Comments, $rootScope) {
    'ngInject';
    this.article=article;
    console.log(this.article);
    this.currentUser= User.current;
    this._Comments=Comments;
    // console.log("this.article",this.article);
$rootScope.setPageTitle(this.article.title); 	
this.article.body = $sce.trustAsHtml(marked(this.article.body, { sanitize: true }));
  // Get comments for this article
    Comments.getAll(this.article.slug).then(
      (comments) => this.comments = comments
    );


this.resetCommentForm();

}
resetCommentForm(){
	this.commentForm={
		isSubmitting:false,
		body: '',
		errors: []
	}
}


addComment(){
	this.commentForm.isSubmitting=true;
console.log("***********************",this.article.slug);
console.log("*************---------------**********",this.commentForm.body);
this._Comments.add(this.article.slug, this.commentForm.body).then(
	
      (comment) => {
        console.log(comment);
        this.comments.unshift(comment);
        this.resetCommentForm();
      },
      (err) => {
        this.commentForm.isSubmitting = false;
       this.commentForm.errors = err.data.errors;
      }
    );
}
 deleteComment(commentId, index) {
    this._Comments.destroy(commentId, this.article.slug).then(
      (success) => {
        this.comments.splice(index, 1);
      }
    );
  }
}

export default ArticleCtrl;

class ArticleActionsCtrl{
	constructor(Articles,User,$state){
		'ngInject';
		this._Articles=Articles;
		console.log("article",User);
		this._$state=$state;

		if (User.current) {
		// console.log("authors name",this.article.slug);
      // this.canModify = (User.current.username === this.article.slug.author.username);
      // console.log("article",this.canModify);
      this.canModify = true;
    } else {
      this.canModify = false;
      // console.log("authors name",this.article.author.username);
    }
	}
	deleteArticle(){
		this.isDeleting=true;
		this._Articles.destroy(this.article.slug).then(
			(success) => this._$state.go('app.home'),
			(err) => this._$state.go('app.home')
			);
	}
	}


let ArticleActions={
	bindings:{
		article:'='
	},
	controller:ArticleActionsCtrl,
	templateUrl: 'article/article-actions.component.html'
};

export default ArticleActions;
import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { log } from 'console';

@Component({
  selector: 'app-article-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.css'
})
export class ArticleListComponent {
  articles: any[] = [];
  newArticle = { title: '', content: '', categoryId: '' }; // Nouveau modèle pour le formulaire
  categories : any [] = [];

  constructor(private articleService: ArticleService, private CategoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadArticles();
    this.loadCategories();
  }

  loadArticles(): void {
    this.articleService.getArticles().subscribe(data => this.articles =
      data);
  }

  loadCategories(): void {
    this.CategoryService.getCategories().subscribe(data => this.categories =
      data);
  }

  deleteArticle(id: string): void {
    this.articleService.deleteArticle(id).subscribe(() =>
      this.loadArticles());
  }

  addArticle(): void {
    if (this.newArticle.title && this.newArticle.content) {
      this.articleService.addArticle(this.newArticle).subscribe(() => {
        this.loadArticles(); // Recharge la liste après ajout
        this.newArticle = { title: '', content: '' ,categoryId:''}; // Réinitialise leformulaire
      });
    }
  }

  getCategoryColor(category_id : string) {
    for(let cat of this.categories){
      console.log(cat.categoryId , category_id);

      if(category_id === cat.id){
        console.log(cat.color);
        
        return cat.color;
      }
    }
    return 'transparent';
  }
     
   
}

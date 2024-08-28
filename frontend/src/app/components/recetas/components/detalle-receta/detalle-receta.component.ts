import { Component} from '@angular/core';
import { Ingrediente, Receta, Recipe } from '../../models/recetas';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-detalle-receta',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule
  ],
  templateUrl: './detalle-receta.component.html',
  styleUrl: './detalle-receta.component.css'
})
export class DetalleRecetaComponent {
    receta: Recipe = new Recipe(null);
    load: boolean = false;
    ingReceta: Ingrediente[] = []

    patch(receta: Receta){
      this.ingReceta = receta.ingredientes;
      this.receta = receta;
    }
}

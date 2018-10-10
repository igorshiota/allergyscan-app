import { Item } from '../models/item.model';

export class ItemsService{

	private items: Item[] = [];

	addItem(name: string){
		this.items.push(new Item(name));
	}

	addItems(items: Item[]){
		this.items.push(...items);
	}

	getItems(){
		return this.items.slice();
	}
	
	removeItem(index: number){
		this.items.splice(index, 1);
	}

	removeAllItems(){
		while(this.items.length){
			this.items = [];
		};


	}
}
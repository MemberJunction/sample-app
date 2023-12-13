import { Injectable } from '@angular/core';
import { Metadata, RunView } from "@memberjunction/core";
import { BookCategoryEntity, BookEntity, BookTopicEntity, TopicEntity, OrganizationEntity } from "mj_generatedentities";


@Injectable({
    providedIn: 'root'
})
export class SharedData {
    [key: string]: any; // Index signature

    protected bookCategories: BookCategoryEntity[] = []
    protected bookTopics: BookCategoryEntity[] = []
    private static _instance: SharedData;
    private _keyPrefix = "__green_gopher_";
    private _updatedDateKeyBase = this._keyPrefix + "updatedDate";

    private loadStructure = [
        { 
            datasetName: 'BookCategory', 
            entities: [ 
                {
                    entityName: 'Book Categories', 
                    code: 'bookCategories' 
                } 
            ] 
        },
        { 
            datasetName: 'Topics', 
            entities: [ 
                {
                    entityName: 'Topics', 
                    code: 'bookTopics' 
                } 
            ] 
        }
    ]

    constructor() {
        if (SharedData._instance) {
            return SharedData._instance;
        }
        else { 
            // first instance
            SharedData._instance = this;
            return this;// not needed but for clarity
        }
    }

    public async Refresh() {
        // get the data from the database, but check local storage first
        // first, check the database and see if anything has been updated. If any updates, we wipe out all our keys in the local storage to ensure that we load fresh data from the DB
        const md = new Metadata();
        const rv = new RunView();
        for (let i = 0; i < this.loadStructure.length; i++) {
            // check each dataset for updates
            const dataset = this.loadStructure[i];
            for (let j = 0; j < dataset.entities.length; j++) {
                const item = dataset.entities[j];
                const result = await rv.RunView({
                    EntityName: item.entityName
                });
                if(result.Success) {
                    this[item.code] = result.Results;
                }
            }
        }
    }

    private _categoriesProcessed = false;
    public get BookCategories(): BookCategoryEntity[] {
        // sort them by name
        if (!this._categoriesProcessed) {
            this.bookCategories.sort((a: BookCategoryEntity, b: BookCategoryEntity) => {
                return a.Name.localeCompare(b.Name);
            });
            this._categoriesProcessed = true;
        }
        return this.bookCategories;
    }

    private _bookTopicsProcessed = false;
    public get BookTopics(): TopicEntity[] {
        // sort them by name
        if (!this._bookTopicsProcessed) {
            this.bookTopics.sort((a: TopicEntity, b: TopicEntity) => {
                return a.Name.localeCompare(b.Name);
            });
            this._bookTopicsProcessed = true;
        }
        return this.bookCategories;
    }
}
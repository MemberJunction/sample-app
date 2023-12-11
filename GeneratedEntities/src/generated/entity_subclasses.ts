import { BaseEntity } from "@memberjunction/core";
import { RegisterClass } from "@memberjunction/global";

/**
 * Book Categories - strongly typed entity sub-class
 * Schema: books
 * Base Table: BookCategory
 * Base View: vwBookCategories
 * @extends {BaseEntity}
 * @class
 * @public
 */
@RegisterClass(BaseEntity, 'Book Categories')
export class BookCategoryEntity extends BaseEntity {
    /**
    * Field Name: ParentID
    * Display Name: Parent ID
    * SQL Data Type: int
    * Related Entity: Book Categories
    */
    get ParentID(): number {  
        return this.Get('ParentID');
    }
    set ParentID(value: number) {
        this.Set('ParentID', value);
    }
    /**
    * Field Name: Name
    * Display Name: Name
    * SQL Data Type: nvarchar(100)
    */
    get Name(): string {  
        return this.Get('Name');
    }
    set Name(value: string) {
        this.Set('Name', value);
    }
    /**
    * Field Name: Description
    * Display Name: Description
    * SQL Data Type: nvarchar(MAX)
    */
    get Description(): string {  
        return this.Get('Description');
    }
    set Description(value: string) {
        this.Set('Description', value);
    }
    /**
    * Field Name: CreatedAt
    * Display Name: Created At
    * SQL Data Type: datetime
    * Default Value: getdate()
    */
    get CreatedAt(): Date {  
        return this.Get('CreatedAt');
    }

    /**
    * Field Name: UpdatedAt
    * Display Name: Updated At
    * SQL Data Type: datetime
    * Default Value: getdate()
    */
    get UpdatedAt(): Date {  
        return this.Get('UpdatedAt');
    }

    /**
    * Field Name: Parent
    * Display Name: Parent
    * SQL Data Type: nvarchar(100)
    */
    get Parent(): string {  
        return this.Get('Parent');
    }


}

/**
 * Books - strongly typed entity sub-class
 * Schema: books
 * Base Table: Book
 * Base View: vwBooks
 * @extends {BaseEntity}
 * @class
 * @public
 */
@RegisterClass(BaseEntity, 'Books')
export class BookEntity extends BaseEntity {
    /**
    * Field Name: BookCategoryID
    * Display Name: Book Category ID
    * SQL Data Type: int
    * Related Entity: Book Categories
    */
    get BookCategoryID(): number {  
        return this.Get('BookCategoryID');
    }
    set BookCategoryID(value: number) {
        this.Set('BookCategoryID', value);
    }
    /**
    * Field Name: Name
    * Display Name: Name
    * SQL Data Type: nvarchar(100)
    */
    get Name(): string {  
        return this.Get('Name');
    }
    set Name(value: string) {
        this.Set('Name', value);
    }
    /**
    * Field Name: Description
    * Display Name: Description
    * SQL Data Type: nvarchar(MAX)
    */
    get Description(): string {  
        return this.Get('Description');
    }
    set Description(value: string) {
        this.Set('Description', value);
    }
    /**
    * Field Name: CoverImageURL
    * Display Name: Cover Image URL
    * SQL Data Type: nvarchar(1000)
    */
    get CoverImageURL(): string {  
        return this.Get('CoverImageURL');
    }
    set CoverImageURL(value: string) {
        this.Set('CoverImageURL', value);
    }
    /**
    * Field Name: Pages
    * Display Name: Pages
    * SQL Data Type: int
    */
    get Pages(): number {  
        return this.Get('Pages');
    }
    set Pages(value: number) {
        this.Set('Pages', value);
    }
    /**
    * Field Name: FullText
    * Display Name: Full Text
    * SQL Data Type: nvarchar(MAX)
    */
    get FullText(): string {  
        return this.Get('FullText');
    }
    set FullText(value: string) {
        this.Set('FullText', value);
    }
    /**
    * Field Name: CreatedAt
    * Display Name: Created At
    * SQL Data Type: datetime
    * Default Value: getdate()
    */
    get CreatedAt(): Date {  
        return this.Get('CreatedAt');
    }

    /**
    * Field Name: UpdatedAt
    * Display Name: Updated At
    * SQL Data Type: datetime
    * Default Value: getdate()
    */
    get UpdatedAt(): Date {  
        return this.Get('UpdatedAt');
    }

    /**
    * Field Name: BookCategory
    * Display Name: Book Category
    * SQL Data Type: nvarchar(100)
    */
    get BookCategory(): string {  
        return this.Get('BookCategory');
    }


}

/**
 * Topics - strongly typed entity sub-class
 * Schema: books
 * Base Table: Topic
 * Base View: vwTopics
 * @extends {BaseEntity}
 * @class
 * @public
 */
@RegisterClass(BaseEntity, 'Topics')
export class TopicEntity extends BaseEntity {
    /**
    * Field Name: Name
    * Display Name: Name
    * SQL Data Type: nvarchar(100)
    */
    get Name(): string {  
        return this.Get('Name');
    }
    set Name(value: string) {
        this.Set('Name', value);
    }
    /**
    * Field Name: Description
    * Display Name: Description
    * SQL Data Type: nvarchar(MAX)
    */
    get Description(): string {  
        return this.Get('Description');
    }
    set Description(value: string) {
        this.Set('Description', value);
    }
    /**
    * Field Name: CreatedAt
    * Display Name: Created At
    * SQL Data Type: datetime
    * Default Value: getdate()
    */
    get CreatedAt(): Date {  
        return this.Get('CreatedAt');
    }

    /**
    * Field Name: UpdatedAt
    * Display Name: Updated At
    * SQL Data Type: datetime
    * Default Value: getdate()
    */
    get UpdatedAt(): Date {  
        return this.Get('UpdatedAt');
    }


}

/**
 * Book Topics - strongly typed entity sub-class
 * Schema: books
 * Base Table: BookTopic
 * Base View: vwBookTopics
 * @extends {BaseEntity}
 * @class
 * @public
 */
@RegisterClass(BaseEntity, 'Book Topics')
export class BookTopicEntity extends BaseEntity {
    /**
    * Field Name: BookID
    * Display Name: Book ID
    * SQL Data Type: int
    * Related Entity: Books
    */
    get BookID(): number {  
        return this.Get('BookID');
    }
    set BookID(value: number) {
        this.Set('BookID', value);
    }
    /**
    * Field Name: TopicID
    * Display Name: Topic ID
    * SQL Data Type: int
    * Related Entity: Topics
    */
    get TopicID(): number {  
        return this.Get('TopicID');
    }
    set TopicID(value: number) {
        this.Set('TopicID', value);
    }
    /**
    * Field Name: CreatedAt
    * Display Name: Created At
    * SQL Data Type: datetime
    * Default Value: getdate()
    */
    get CreatedAt(): Date {  
        return this.Get('CreatedAt');
    }

    /**
    * Field Name: UpdatedAt
    * Display Name: Updated At
    * SQL Data Type: datetime
    * Default Value: getdate()
    */
    get UpdatedAt(): Date {  
        return this.Get('UpdatedAt');
    }

    /**
    * Field Name: Book
    * Display Name: Book
    * SQL Data Type: nvarchar(100)
    */
    get Book(): string {  
        return this.Get('Book');
    }

    /**
    * Field Name: Topic
    * Display Name: Topic
    * SQL Data Type: nvarchar(100)
    */
    get Topic(): string {  
        return this.Get('Topic');
    }


}

/**
 * Organizations - strongly typed entity sub-class
 * Schema: customers
 * Base Table: Organization
 * Base View: vwOrganizations
 * @extends {BaseEntity}
 * @class
 * @public
 */
@RegisterClass(BaseEntity, 'Organizations')
export class OrganizationEntity extends BaseEntity {
    /**
    * Field Name: Name
    * Display Name: Name
    * SQL Data Type: nvarchar(255)
    */
    get Name(): string {  
        return this.Get('Name');
    }
    set Name(value: string) {
        this.Set('Name', value);
    }
    /**
    * Field Name: Address
    * Display Name: Address
    * SQL Data Type: nvarchar(100)
    */
    get Address(): string {  
        return this.Get('Address');
    }
    set Address(value: string) {
        this.Set('Address', value);
    }
    /**
    * Field Name: City
    * Display Name: City
    * SQL Data Type: nvarchar(50)
    */
    get City(): string {  
        return this.Get('City');
    }
    set City(value: string) {
        this.Set('City', value);
    }
    /**
    * Field Name: StateProvince
    * Display Name: State Province
    * SQL Data Type: nvarchar(50)
    */
    get StateProvince(): string {  
        return this.Get('StateProvince');
    }
    set StateProvince(value: string) {
        this.Set('StateProvince', value);
    }
    /**
    * Field Name: PostalCode
    * Display Name: Postal Code
    * SQL Data Type: nvarchar(50)
    */
    get PostalCode(): string {  
        return this.Get('PostalCode');
    }
    set PostalCode(value: string) {
        this.Set('PostalCode', value);
    }
    /**
    * Field Name: Country
    * Display Name: Country
    * SQL Data Type: nvarchar(100)
    */
    get Country(): string {  
        return this.Get('Country');
    }
    set Country(value: string) {
        this.Set('Country', value);
    }
    /**
    * Field Name: Website
    * Display Name: Website
    * SQL Data Type: nvarchar(255)
    */
    get Website(): string {  
        return this.Get('Website');
    }
    set Website(value: string) {
        this.Set('Website', value);
    }
    /**
    * Field Name: Phone
    * Display Name: Phone
    * SQL Data Type: nvarchar(20)
    */
    get Phone(): string {  
        return this.Get('Phone');
    }
    set Phone(value: string) {
        this.Set('Phone', value);
    }
    /**
    * Field Name: CreatedAt
    * Display Name: Created At
    * SQL Data Type: datetime
    * Default Value: getdate()
    */
    get CreatedAt(): Date {  
        return this.Get('CreatedAt');
    }

    /**
    * Field Name: UpdatedAt
    * Display Name: Updated At
    * SQL Data Type: datetime
    * Default Value: getdate()
    */
    get UpdatedAt(): Date {  
        return this.Get('UpdatedAt');
    }


}

/**
 * Persons - strongly typed entity sub-class
 * Schema: customers
 * Base Table: Person
 * Base View: vwPersons
 * @extends {BaseEntity}
 * @class
 * @public
 */
@RegisterClass(BaseEntity, 'Persons')
export class PersonEntity extends BaseEntity {
    /**
    * Field Name: FirstName
    * Display Name: First Name
    * SQL Data Type: nvarchar(50)
    */
    get FirstName(): string {  
        return this.Get('FirstName');
    }
    set FirstName(value: string) {
        this.Set('FirstName', value);
    }
    /**
    * Field Name: LastName
    * Display Name: Last Name
    * SQL Data Type: nvarchar(50)
    */
    get LastName(): string {  
        return this.Get('LastName');
    }
    set LastName(value: string) {
        this.Set('LastName', value);
    }
    /**
    * Field Name: OrganizationID
    * Display Name: Organization ID
    * SQL Data Type: int
    */
    get OrganizationID(): number {  
        return this.Get('OrganizationID');
    }
    set OrganizationID(value: number) {
        this.Set('OrganizationID', value);
    }
    /**
    * Field Name: Email
    * Display Name: Email
    * SQL Data Type: nvarchar(100)
    */
    get Email(): string {  
        return this.Get('Email');
    }
    set Email(value: string) {
        this.Set('Email', value);
    }
    /**
    * Field Name: Phone
    * Display Name: Phone
    * SQL Data Type: nvarchar(20)
    */
    get Phone(): string {  
        return this.Get('Phone');
    }
    set Phone(value: string) {
        this.Set('Phone', value);
    }
    /**
    * Field Name: CreatedAt
    * Display Name: Created At
    * SQL Data Type: datetime
    */
    get CreatedAt(): Date {  
        return this.Get('CreatedAt');
    }

    /**
    * Field Name: UpdatedAt
    * Display Name: Updated At
    * SQL Data Type: datetime
    */
    get UpdatedAt(): Date {  
        return this.Get('UpdatedAt');
    }


}

/**
 * Person Topics - strongly typed entity sub-class
 * Schema: customers
 * Base Table: PersonTopic
 * Base View: vwPersonTopics
 * @extends {BaseEntity}
 * @class
 * @public
 */
@RegisterClass(BaseEntity, 'Person Topics')
export class PersonTopicEntity extends BaseEntity {
    /**
    * Field Name: PersonID
    * Display Name: Person ID
    * SQL Data Type: int
    * Related Entity: Persons
    */
    get PersonID(): number {  
        return this.Get('PersonID');
    }
    set PersonID(value: number) {
        this.Set('PersonID', value);
    }
    /**
    * Field Name: TopicID
    * Display Name: Topic ID
    * SQL Data Type: int
    * Related Entity: Topics
    */
    get TopicID(): number {  
        return this.Get('TopicID');
    }
    set TopicID(value: number) {
        this.Set('TopicID', value);
    }
    /**
    * Field Name: BookTopicID
    * Display Name: Book Topic ID
    * SQL Data Type: int
    * Related Entity: Book Topics
    */
    get BookTopicID(): number {  
        return this.Get('BookTopicID');
    }
    set BookTopicID(value: number) {
        this.Set('BookTopicID', value);
    }
    /**
    * Field Name: DateAdded
    * Display Name: Date Added
    * SQL Data Type: datetime
    * Default Value: getdate()
    */
    get DateAdded(): Date {  
        return this.Get('DateAdded');
    }
    set DateAdded(value: Date) {
        this.Set('DateAdded', value);
    }
    /**
    * Field Name: InterestLevel
    * Display Name: Interest Level
    * SQL Data Type: int
    * Default Value: 0
    */
    get InterestLevel(): number {  
        return this.Get('InterestLevel');
    }
    set InterestLevel(value: number) {
        this.Set('InterestLevel', value);
    }

}

/**
 * Purchases - strongly typed entity sub-class
 * Schema: customers
 * Base Table: Purchase
 * Base View: vwPurchases
 * @extends {BaseEntity}
 * @class
 * @public
 */
@RegisterClass(BaseEntity, 'Purchases')
export class PurchaseEntity extends BaseEntity {
    /**
    * Field Name: Date
    * Display Name: Date
    * SQL Data Type: date
    */
    get Date(): Date {  
        return this.Get('Date');
    }
    set Date(value: Date) {
        this.Set('Date', value);
    }
    /**
    * Field Name: PersonID
    * Display Name: Person ID
    * SQL Data Type: int
    * Related Entity: Persons
    */
    get PersonID(): number {  
        return this.Get('PersonID');
    }
    set PersonID(value: number) {
        this.Set('PersonID', value);
    }
    /**
    * Field Name: GrandTotal
    * Display Name: Grand Total
    * SQL Data Type: money
    * Default Value: 0
    */
    get GrandTotal(): number {  
        return this.Get('GrandTotal');
    }
    set GrandTotal(value: number) {
        this.Set('GrandTotal', value);
    }
    /**
    * Field Name: CreatedAt
    * Display Name: Created At
    * SQL Data Type: datetime
    * Default Value: getdate()
    */
    get CreatedAt(): Date {  
        return this.Get('CreatedAt');
    }

    /**
    * Field Name: UpdatedAt
    * Display Name: Updated At
    * SQL Data Type: datetime
    * Default Value: getdate()
    */
    get UpdatedAt(): Date {  
        return this.Get('UpdatedAt');
    }


}

/**
 * Purchase Details - strongly typed entity sub-class
 * Schema: customers
 * Base Table: PurchaseDetail
 * Base View: vwPurchaseDetails
 * @extends {BaseEntity}
 * @class
 * @public
 */
@RegisterClass(BaseEntity, 'Purchase Details')
export class PurchaseDetailEntity extends BaseEntity {
    /**
    * Field Name: PurchaseID
    * Display Name: Purchase ID
    * SQL Data Type: int
    * Related Entity: Purchases
    */
    get PurchaseID(): number {  
        return this.Get('PurchaseID');
    }
    set PurchaseID(value: number) {
        this.Set('PurchaseID', value);
    }
    /**
    * Field Name: BookID
    * Display Name: Book ID
    * SQL Data Type: int
    * Related Entity: Books
    */
    get BookID(): number {  
        return this.Get('BookID');
    }
    set BookID(value: number) {
        this.Set('BookID', value);
    }
    /**
    * Field Name: Quantity
    * Display Name: Quantity
    * SQL Data Type: decimal(28, 4)
    * Default Value: 1
    */
    get Quantity(): number {  
        return this.Get('Quantity');
    }
    set Quantity(value: number) {
        this.Set('Quantity', value);
    }
    /**
    * Field Name: Amount
    * Display Name: Amount
    * SQL Data Type: money
    * Default Value: 0
    */
    get Amount(): number {  
        return this.Get('Amount');
    }
    set Amount(value: number) {
        this.Set('Amount', value);
    }
    /**
    * Field Name: Discount
    * Display Name: Discount
    * SQL Data Type: money
    * Default Value: 0
    */
    get Discount(): number {  
        return this.Get('Discount');
    }
    set Discount(value: number) {
        this.Set('Discount', value);
    }
    /**
    * Field Name: Total
    * Display Name: Total
    * SQL Data Type: money
    * Default Value: 0
    */
    get Total(): number {  
        return this.Get('Total');
    }
    set Total(value: number) {
        this.Set('Total', value);
    }
    /**
    * Field Name: CreatedAt
    * Display Name: Created At
    * SQL Data Type: datetime
    * Default Value: getdate()
    */
    get CreatedAt(): Date {  
        return this.Get('CreatedAt');
    }

    /**
    * Field Name: UpdatedAt
    * Display Name: Updated At
    * SQL Data Type: datetime
    * Default Value: getdate()
    */
    get UpdatedAt(): Date {  
        return this.Get('UpdatedAt');
    }


}

/********************************************************************************
* ALL ENTITIES - TypeORM/TypeGraphQL Type Class Definition - AUTO GENERATED FILE
* Generated Entities and Resolvers for Server
* 
* GENERATED: 12/24/2023, 8:58:39 PM
* 
*   >>> DO NOT MODIFY THIS FILE!!!!!!!!!!!!
*   >>> YOUR CHANGES WILL BE OVERWRITTEN
*   >>> THE NEXT TIME THIS FILE IS GENERATED
* 
**********************************************************************************/
import { Arg, Ctx, Int, Query, Resolver, Field, Float, ObjectType, FieldResolver, Root, InputType, Mutation, PubSub, PubSubEngine } from '@memberjunction/server';
import { AppContext } from '@memberjunction/server';
import { MaxLength } from 'class-validator';
import { ResolverBase } from '../generic/ResolverBase';
import { RunViewByIDInput, RunViewByNameInput, RunDynamicViewInput } from '../generic/RunViewResolver';
import {
  BaseEntity,
  PrimaryGeneratedColumn,
  JoinTable,
  ViewEntity,
  ManyToMany,
  OneToMany,
  Column,
  ViewColumn,
  DataSource
} from 'typeorm';
import * as MJGeneratedEntities from 'mj_generatedentities'
import { Metadata, EntityPermissionType } from '@memberjunction/core'


//****************************************************************************
// ENTITY CLASS for Companies
//****************************************************************************
@ViewEntity({
   name: 'vwCompanies',
   synchronize: false,
})
@ObjectType({ description: 'List of Companies/Organizations within the top-level business, used for subsidiaries' })
export class Company_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field() 
    @MaxLength(100)
    @Column()
    Name: string;
      
    @Field() 
    @MaxLength(400)
    @Column()
    Description: string;
      
    @Field({nullable: true}) 
    @MaxLength(200)
    @Column()
    Website?: string;
      
    @Field({nullable: true}) 
    @MaxLength(1000)
    @Column()
    LogoURL?: string;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
      
    @Field() 
    @MaxLength(8)
    @Column()
    UpdatedAt: Date;
      
    @Field({nullable: true}) 
    @MaxLength(510)
    @Column()
    Domain?: string;
    
    @Field(() => [Employee_])
    @OneToMany(() => Employee_, () => null)
    Employees: Employee_[]; // Link to Employees

    @Field(() => [CompanyIntegration_])
    @OneToMany(() => CompanyIntegration_, () => null)
    CompanyIntegrations: CompanyIntegration_[]; // Link to CompanyIntegrations

    @Field(() => [Workflow_])
    @OneToMany(() => Workflow_, () => null)
    Workflows: Workflow_[]; // Link to Workflows

}
        
//****************************************************************************
// INPUT TYPE for Companies   
//****************************************************************************
@InputType()
export class CreateCompanyInput {
    @Field()
    Name: string;

    @Field()
    Description: string;

    @Field({ nullable: true })
    Website: string;

    @Field({ nullable: true })
    LogoURL: string;

    @Field({ nullable: true })
    Domain: string;
}

        
//****************************************************************************
// INPUT TYPE for Companies   
//****************************************************************************
@InputType()
export class UpdateCompanyInput {
    @Field(() => Int, )
    ID: number;

    @Field()
    Name: string;

    @Field()
    Description: string;

    @Field({ nullable: true })
    Website: string;

    @Field({ nullable: true })
    LogoURL: string;

    @Field({ nullable: true })
    Domain: string;
}

//****************************************************************************
// RESOLVER for Companies
//****************************************************************************
@ObjectType()
export class RunCompanyViewResult {
    @Field(() => [Company_])
    Results: Company_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(Company_)
export class CompanyResolver extends ResolverBase {
    @Query(() => RunCompanyViewResult)
    async RunCompanyViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunCompanyViewResult)
    async RunCompanyViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunCompanyViewResult)
    async RunCompanyDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Companies';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => Company_, { nullable: true })
    async Company(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<Company_ | null> {
        this.CheckUserReadPermissions('Companies', userPayload);
        const sSQL = `SELECT * FROM vwCompanies WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Companies', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }

    @Query(() => [Company_])
    AllCompanies(@Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Companies', userPayload);
        const sSQL = 'SELECT * FROM vwCompanies' + this.getRowLevelSecurityWhereClause('Companies', userPayload, EntityPermissionType.Read, ' WHERE');
        return dataSource.query(sSQL);
    }
  
    @FieldResolver(() => [Employee_])
    async Employees(@Root() company: Company_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Employees', userPayload);
        const sSQL = `SELECT * FROM vwEmployees WHERE CompanyID=${company.ID} ` + this.getRowLevelSecurityWhereClause('Employees', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [CompanyIntegration_])
    async CompanyIntegrations(@Root() company: Company_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Company Integrations', userPayload);
        const sSQL = `SELECT * FROM vwCompanyIntegrations WHERE CompanyName=${company.ID} ` + this.getRowLevelSecurityWhereClause('Company Integrations', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [Workflow_])
    async Workflows(@Root() company: Company_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Workflows', userPayload);
        const sSQL = `SELECT * FROM vwWorkflows WHERE CompanyName=${company.ID} ` + this.getRowLevelSecurityWhereClause('Workflows', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
    
    @Mutation(() => Company_)
    async CreateCompany(
        @Arg('input', () => CreateCompanyInput) input: CreateCompanyInput,
        @Ctx() { dataSource, userPayload }: AppContext, 
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeCreate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Companies', this.GetUserFromPayload(userPayload));
            await entityObject.NewRecord();
            entityObject.SetMany(input);
            if (await entityObject.Save()) {
                // save worked, fire the AfterCreate event and then return all the data
                await this.AfterCreate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else 
                // save failed, return null
                return null;
        }
        else    
            return null;
    }

    // Before/After CREATE Event Hooks for Sub-Classes to Override
    protected async BeforeCreate(dataSource: DataSource, input: CreateCompanyInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterCreate(dataSource: DataSource, input: CreateCompanyInput) {
        const i = input, d = dataSource; // prevent error
    }
    
    @Mutation(() => Company_)
    async UpdateCompany(
        @Arg('input', () => UpdateCompanyInput) input: UpdateCompanyInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Companies', this.GetUserFromPayload(userPayload));
            await entityObject.Load(input.ID) // Track Changes is turned on, so we need to get the latest data from DB first before we save
            entityObject.SetMany(input);
            if (await entityObject.Save()) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateCompanyInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateCompanyInput) {
        const i = input, d = dataSource; // prevent error
    }

    @Mutation(() => Int)
    async DeleteCompany(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        if (await this.BeforeDelete(dataSource, ID)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Companies', this.GetUserFromPayload(userPayload));
            await entityObject.Load(ID)
            if (await entityObject.Delete()) {
                await this.AfterDelete(dataSource, ID); // fire event
                return ID;
            }
            else 
                return null; // delete failed
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeDelete(dataSource: DataSource, ID: number): Promise<boolean> {
        const i = ID, d = dataSource; // prevent error;
        return true;
    }
    protected async AfterDelete(dataSource: DataSource, ID: number) {
        const i = ID, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for Employees
//****************************************************************************
@ViewEntity({
   name: 'vwEmployees',
   synchronize: false,
})
@ObjectType({ description: 'Employees of the Blue Cypress Family of Companies' })
export class Employee_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field() 
    @MaxLength(16)
    @Column()
    BCMID: string;
      
    @Field() 
    @MaxLength(60)
    @Column()
    FirstName: string;
      
    @Field() 
    @MaxLength(100)
    @Column()
    LastName: string;
      
    @Field({nullable: true}) 
    @MaxLength(100)
    @Column()
    Title?: string;
      
    @Field({description: '5'}) 
    @MaxLength(200)
    @Column()
    Email: string;
      
    @Field({nullable: true}) 
    @MaxLength(40)
    @Column()
    Phone?: string;
      
    @Field(() => Boolean) 
    @Column()
    Active: boolean;
      
    @Field(() => Int) 
    @Column()
    CompanyID: number;
      
    @Field(() => Int, {nullable: true}) 
    @Column()
    SupervisorID?: number;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
      
    @Field() 
    @MaxLength(8)
    @Column()
    UpdatedAt: Date;
      
    @Field({nullable: true}) 
    @MaxLength(162)
    @ViewColumn()
    FirstLast?: string;
      
    @Field({nullable: true}) 
    @MaxLength(162)
    @ViewColumn()
    Supervisor?: string;
      
    @Field({nullable: true}) 
    @MaxLength(60)
    @ViewColumn()
    SupervisorFirstName?: string;
      
    @Field({nullable: true}) 
    @MaxLength(100)
    @ViewColumn()
    SupervisorLastName?: string;
      
    @Field({nullable: true}) 
    @MaxLength(200)
    @ViewColumn()
    SupervisorEmail?: string;
    
    @Field(() => [Employee_])
    @OneToMany(() => Employee_, () => null)
    Employees: Employee_[]; // Link to Employees

    @Field(() => [EmployeeCompanyIntegration_])
    @OneToMany(() => EmployeeCompanyIntegration_, () => null)
    EmployeeCompanyIntegrations: EmployeeCompanyIntegration_[]; // Link to EmployeeCompanyIntegrations

    @Field(() => [EmployeeRole_])
    @OneToMany(() => EmployeeRole_, () => null)
    EmployeeRoles: EmployeeRole_[]; // Link to EmployeeRoles

    @Field(() => [EmployeeSkill_])
    @OneToMany(() => EmployeeSkill_, () => null)
    EmployeeSkills: EmployeeSkill_[]; // Link to EmployeeSkills

}
        
//****************************************************************************
// INPUT TYPE for Employees   
//****************************************************************************
@InputType()
export class CreateEmployeeInput {
    @Field()
    FirstName: string;

    @Field()
    LastName: string;

    @Field({ nullable: true })
    Title: string;

    @Field()
    Email: string;

    @Field({ nullable: true })
    Phone: string;

    @Field(() => Boolean, )
    Active: boolean;

    @Field(() => Int, )
    CompanyID: number;

    @Field(() => Int, { nullable: true })
    SupervisorID: number;
}

        
//****************************************************************************
// INPUT TYPE for Employees   
//****************************************************************************
@InputType()
export class UpdateEmployeeInput {
    @Field(() => Int, )
    ID: number;

    @Field()
    FirstName: string;

    @Field()
    LastName: string;

    @Field({ nullable: true })
    Title: string;

    @Field()
    Email: string;

    @Field({ nullable: true })
    Phone: string;

    @Field(() => Boolean, )
    Active: boolean;

    @Field(() => Int, )
    CompanyID: number;

    @Field(() => Int, { nullable: true })
    SupervisorID: number;
}

//****************************************************************************
// RESOLVER for Employees
//****************************************************************************
@ObjectType()
export class RunEmployeeViewResult {
    @Field(() => [Employee_])
    Results: Employee_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(Employee_)
export class EmployeeResolver extends ResolverBase {
    @Query(() => RunEmployeeViewResult)
    async RunEmployeeViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunEmployeeViewResult)
    async RunEmployeeViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunEmployeeViewResult)
    async RunEmployeeDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Employees';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => Employee_, { nullable: true })
    async Employee(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<Employee_ | null> {
        this.CheckUserReadPermissions('Employees', userPayload);
        const sSQL = `SELECT * FROM vwEmployees WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Employees', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }

    @Query(() => [Employee_])
    AllEmployees(@Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Employees', userPayload);
        const sSQL = 'SELECT * FROM vwEmployees' + this.getRowLevelSecurityWhereClause('Employees', userPayload, EntityPermissionType.Read, ' WHERE');
        return dataSource.query(sSQL);
    }
  
    @FieldResolver(() => [Employee_])
    async Employees(@Root() employee: Employee_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Employees', userPayload);
        const sSQL = `SELECT * FROM vwEmployees WHERE SupervisorID=${employee.ID} ` + this.getRowLevelSecurityWhereClause('Employees', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [EmployeeCompanyIntegration_])
    async EmployeeCompanyIntegrations(@Root() employee: Employee_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Employee Company Integrations', userPayload);
        const sSQL = `SELECT * FROM vwEmployeeCompanyIntegrations WHERE EmployeeID=${employee.ID} ` + this.getRowLevelSecurityWhereClause('Employee Company Integrations', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [EmployeeRole_])
    async EmployeeRoles(@Root() employee: Employee_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Employee Roles', userPayload);
        const sSQL = `SELECT * FROM vwEmployeeRoles WHERE EmployeeID=${employee.ID} ` + this.getRowLevelSecurityWhereClause('Employee Roles', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [EmployeeSkill_])
    async EmployeeSkills(@Root() employee: Employee_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Employee Skills', userPayload);
        const sSQL = `SELECT * FROM vwEmployeeSkills WHERE EmployeeID=${employee.ID} ` + this.getRowLevelSecurityWhereClause('Employee Skills', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
    
    @Mutation(() => Employee_)
    async CreateEmployee(
        @Arg('input', () => CreateEmployeeInput) input: CreateEmployeeInput,
        @Ctx() { dataSource, userPayload }: AppContext, 
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeCreate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Employees', this.GetUserFromPayload(userPayload));
            await entityObject.NewRecord();
            entityObject.SetMany(input);
            if (await entityObject.Save()) {
                // save worked, fire the AfterCreate event and then return all the data
                await this.AfterCreate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else 
                // save failed, return null
                return null;
        }
        else    
            return null;
    }

    // Before/After CREATE Event Hooks for Sub-Classes to Override
    protected async BeforeCreate(dataSource: DataSource, input: CreateEmployeeInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterCreate(dataSource: DataSource, input: CreateEmployeeInput) {
        const i = input, d = dataSource; // prevent error
    }
    
    @Mutation(() => Employee_)
    async UpdateEmployee(
        @Arg('input', () => UpdateEmployeeInput) input: UpdateEmployeeInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Employees', this.GetUserFromPayload(userPayload));
            await entityObject.Load(input.ID) // Track Changes is turned on, so we need to get the latest data from DB first before we save
            entityObject.SetMany(input);
            if (await entityObject.Save()) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateEmployeeInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateEmployeeInput) {
        const i = input, d = dataSource; // prevent error
    }

    @Mutation(() => Int)
    async DeleteEmployee(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        if (await this.BeforeDelete(dataSource, ID)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Employees', this.GetUserFromPayload(userPayload));
            await entityObject.Load(ID)
            if (await entityObject.Delete()) {
                await this.AfterDelete(dataSource, ID); // fire event
                return ID;
            }
            else 
                return null; // delete failed
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeDelete(dataSource: DataSource, ID: number): Promise<boolean> {
        const i = ID, d = dataSource; // prevent error;
        return true;
    }
    protected async AfterDelete(dataSource: DataSource, ID: number) {
        const i = ID, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for User Favorites
//****************************************************************************
@ViewEntity({
   name: 'vwUserFavorites',
   synchronize: false,
})
@ObjectType()
export class UserFavorite_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field(() => Int) 
    @Column()
    UserID: number;
      
    @Field(() => Int) 
    @Column()
    EntityID: number;
      
    @Field(() => Int) 
    @Column()
    RecordID: number;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
      
    @Field() 
    @MaxLength(8)
    @Column()
    UpdatedAt: Date;
      
    @Field() 
    @MaxLength(100)
    @ViewColumn()
    Entity: string;
      
    @Field() 
    @MaxLength(100)
    @ViewColumn()
    EntityBaseTable: string;
      
    @Field() 
    @MaxLength(100)
    @ViewColumn()
    EntityBaseView: string;
    
}
        
//****************************************************************************
// INPUT TYPE for User Favorites   
//****************************************************************************
@InputType()
export class CreateUserFavoriteInput {
    @Field(() => Int, )
    UserID: number;

    @Field(() => Int, )
    EntityID: number;

    @Field(() => Int, )
    RecordID: number;
}

        
//****************************************************************************
// INPUT TYPE for User Favorites   
//****************************************************************************
@InputType()
export class UpdateUserFavoriteInput {
    @Field(() => Int, )
    ID: number;

    @Field(() => Int, )
    UserID: number;

    @Field(() => Int, )
    EntityID: number;

    @Field(() => Int, )
    RecordID: number;
}

//****************************************************************************
// RESOLVER for User Favorites
//****************************************************************************
@ObjectType()
export class RunUserFavoriteViewResult {
    @Field(() => [UserFavorite_])
    Results: UserFavorite_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(UserFavorite_)
export class UserFavoriteResolverBase extends ResolverBase {
    @Query(() => RunUserFavoriteViewResult)
    async RunUserFavoriteViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunUserFavoriteViewResult)
    async RunUserFavoriteViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunUserFavoriteViewResult)
    async RunUserFavoriteDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'User Favorites';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => UserFavorite_, { nullable: true })
    async UserFavorite(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<UserFavorite_ | null> {
        this.CheckUserReadPermissions('User Favorites', userPayload);
        const sSQL = `SELECT * FROM vwUserFavorites WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('User Favorites', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }

    @Mutation(() => UserFavorite_)
    async CreateUserFavorite(
        @Arg('input', () => CreateUserFavoriteInput) input: CreateUserFavoriteInput,
        @Ctx() { dataSource, userPayload }: AppContext, 
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeCreate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('User Favorites', this.GetUserFromPayload(userPayload));
            await entityObject.NewRecord();
            entityObject.SetMany(input);
            if (await entityObject.Save()) {
                // save worked, fire the AfterCreate event and then return all the data
                await this.AfterCreate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else 
                // save failed, return null
                return null;
        }
        else    
            return null;
    }

    // Before/After CREATE Event Hooks for Sub-Classes to Override
    protected async BeforeCreate(dataSource: DataSource, input: CreateUserFavoriteInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterCreate(dataSource: DataSource, input: CreateUserFavoriteInput) {
        const i = input, d = dataSource; // prevent error
    }
    
    @Mutation(() => UserFavorite_)
    async UpdateUserFavorite(
        @Arg('input', () => UpdateUserFavoriteInput) input: UpdateUserFavoriteInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('User Favorites', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for User Favorites
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateUserFavoriteInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateUserFavoriteInput) {
        const i = input, d = dataSource; // prevent error
    }

    @Mutation(() => Int)
    async DeleteUserFavorite(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        if (await this.BeforeDelete(dataSource, ID)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('User Favorites', this.GetUserFromPayload(userPayload));
            await entityObject.Load(ID)
            if (await entityObject.Delete()) {
                await this.AfterDelete(dataSource, ID); // fire event
                return ID;
            }
            else 
                return null; // delete failed
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeDelete(dataSource: DataSource, ID: number): Promise<boolean> {
        const i = ID, d = dataSource; // prevent error;
        return true;
    }
    protected async AfterDelete(dataSource: DataSource, ID: number) {
        const i = ID, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for Employee Company Integrations
//****************************************************************************
@ViewEntity({
   name: 'vwEmployeeCompanyIntegrations',
   synchronize: false,
})
@ObjectType()
export class EmployeeCompanyIntegration_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field(() => Int) 
    @Column()
    EmployeeID: number;
      
    @Field(() => Int) 
    @Column()
    CompanyIntegrationID: number;
      
    @Field() 
    @MaxLength(200)
    @Column()
    ExternalSystemRecordID: string;
      
    @Field(() => Boolean) 
    @Column()
    IsActive: boolean;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
      
    @Field() 
    @MaxLength(8)
    @Column()
    UpdatedAt: Date;
    
}
        
//****************************************************************************
// INPUT TYPE for Employee Company Integrations   
//****************************************************************************
@InputType()
export class UpdateEmployeeCompanyIntegrationInput {
    @Field(() => Int, )
    ID: number;

    @Field(() => Int, )
    EmployeeID: number;

    @Field(() => Int, )
    CompanyIntegrationID: number;

    @Field()
    ExternalSystemRecordID: string;

    @Field(() => Boolean, )
    IsActive: boolean;
}

//****************************************************************************
// RESOLVER for Employee Company Integrations
//****************************************************************************
@ObjectType()
export class RunEmployeeCompanyIntegrationViewResult {
    @Field(() => [EmployeeCompanyIntegration_])
    Results: EmployeeCompanyIntegration_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(EmployeeCompanyIntegration_)
export class EmployeeCompanyIntegrationResolver extends ResolverBase {
    @Query(() => RunEmployeeCompanyIntegrationViewResult)
    async RunEmployeeCompanyIntegrationViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunEmployeeCompanyIntegrationViewResult)
    async RunEmployeeCompanyIntegrationViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunEmployeeCompanyIntegrationViewResult)
    async RunEmployeeCompanyIntegrationDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Employee Company Integrations';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => EmployeeCompanyIntegration_, { nullable: true })
    async EmployeeCompanyIntegration(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<EmployeeCompanyIntegration_ | null> {
        this.CheckUserReadPermissions('Employee Company Integrations', userPayload);
        const sSQL = `SELECT * FROM vwEmployeeCompanyIntegrations WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Employee Company Integrations', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }

    @Mutation(() => EmployeeCompanyIntegration_)
    async UpdateEmployeeCompanyIntegration(
        @Arg('input', () => UpdateEmployeeCompanyIntegrationInput) input: UpdateEmployeeCompanyIntegrationInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Employee Company Integrations', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for Employee Company Integrations
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateEmployeeCompanyIntegrationInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateEmployeeCompanyIntegrationInput) {
        const i = input, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for Employee Roles
//****************************************************************************
@ViewEntity({
   name: 'vwEmployeeRoles',
   synchronize: false,
})
@ObjectType()
export class EmployeeRole_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field(() => Int) 
    @Column()
    EmployeeID: number;
      
    @Field(() => Int) 
    @Column()
    RoleID: number;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
      
    @Field() 
    @MaxLength(8)
    @Column()
    UpdatedAt: Date;
      
    @Field() 
    @MaxLength(100)
    @ViewColumn()
    Role: string;
    
}
        
//****************************************************************************
// INPUT TYPE for Employee Roles   
//****************************************************************************
@InputType()
export class UpdateEmployeeRoleInput {
    @Field(() => Int, )
    ID: number;

    @Field(() => Int, )
    EmployeeID: number;

    @Field(() => Int, )
    RoleID: number;
}

//****************************************************************************
// RESOLVER for Employee Roles
//****************************************************************************
@ObjectType()
export class RunEmployeeRoleViewResult {
    @Field(() => [EmployeeRole_])
    Results: EmployeeRole_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(EmployeeRole_)
export class EmployeeRoleResolver extends ResolverBase {
    @Query(() => RunEmployeeRoleViewResult)
    async RunEmployeeRoleViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunEmployeeRoleViewResult)
    async RunEmployeeRoleViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunEmployeeRoleViewResult)
    async RunEmployeeRoleDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Employee Roles';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => EmployeeRole_, { nullable: true })
    async EmployeeRole(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<EmployeeRole_ | null> {
        this.CheckUserReadPermissions('Employee Roles', userPayload);
        const sSQL = `SELECT * FROM vwEmployeeRoles WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Employee Roles', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }

    @Mutation(() => EmployeeRole_)
    async UpdateEmployeeRole(
        @Arg('input', () => UpdateEmployeeRoleInput) input: UpdateEmployeeRoleInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Employee Roles', this.GetUserFromPayload(userPayload));
            await entityObject.Load(input.ID) // Track Changes is turned on, so we need to get the latest data from DB first before we save
            entityObject.SetMany(input);
            if (await entityObject.Save()) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateEmployeeRoleInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateEmployeeRoleInput) {
        const i = input, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for Employee Skills
//****************************************************************************
@ViewEntity({
   name: 'vwEmployeeSkills',
   synchronize: false,
})
@ObjectType()
export class EmployeeSkill_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field(() => Int) 
    @Column()
    EmployeeID: number;
      
    @Field() 
    @MaxLength(36)
    @Column()
    SkillID: string;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
      
    @Field() 
    @MaxLength(8)
    @Column()
    UpdatedAt: Date;
      
    @Field() 
    @MaxLength(100)
    @ViewColumn()
    Skill: string;
    
}
        
//****************************************************************************
// INPUT TYPE for Employee Skills   
//****************************************************************************
@InputType()
export class UpdateEmployeeSkillInput {
    @Field(() => Int, )
    ID: number;

    @Field(() => Int, )
    EmployeeID: number;

    @Field()
    SkillID: string;
}

//****************************************************************************
// RESOLVER for Employee Skills
//****************************************************************************
@ObjectType()
export class RunEmployeeSkillViewResult {
    @Field(() => [EmployeeSkill_])
    Results: EmployeeSkill_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(EmployeeSkill_)
export class EmployeeSkillResolver extends ResolverBase {
    @Query(() => RunEmployeeSkillViewResult)
    async RunEmployeeSkillViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunEmployeeSkillViewResult)
    async RunEmployeeSkillViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunEmployeeSkillViewResult)
    async RunEmployeeSkillDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Employee Skills';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => EmployeeSkill_, { nullable: true })
    async EmployeeSkill(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<EmployeeSkill_ | null> {
        this.CheckUserReadPermissions('Employee Skills', userPayload);
        const sSQL = `SELECT * FROM vwEmployeeSkills WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Employee Skills', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }

    @Mutation(() => EmployeeSkill_)
    async UpdateEmployeeSkill(
        @Arg('input', () => UpdateEmployeeSkillInput) input: UpdateEmployeeSkillInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Employee Skills', this.GetUserFromPayload(userPayload));
            await entityObject.Load(input.ID) // Track Changes is turned on, so we need to get the latest data from DB first before we save
            entityObject.SetMany(input);
            if (await entityObject.Save()) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateEmployeeSkillInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateEmployeeSkillInput) {
        const i = input, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for Roles
//****************************************************************************
@ViewEntity({
   name: 'vwRoles',
   synchronize: false,
})
@ObjectType()
export class Role_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field() 
    @MaxLength(100)
    @Column()
    Name: string;
      
    @Field({nullable: true}) 
    @MaxLength(1000)
    @Column()
    Description?: string;
      
    @Field({nullable: true}) 
    @MaxLength(100)
    @Column()
    AzureID?: string;
      
    @Field() 
    @MaxLength(100)
    @Column()
    SQLName: string;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
      
    @Field() 
    @MaxLength(8)
    @Column()
    UpdatedAt: Date;
    
    @Field(() => [EmployeeRole_])
    @OneToMany(() => EmployeeRole_, () => null)
    EmployeeRoles: EmployeeRole_[]; // Link to EmployeeRoles

    @Field(() => [EntityPermission_])
    @OneToMany(() => EntityPermission_, () => null)
    EntityPermissions: EntityPermission_[]; // Link to EntityPermissions

    @Field(() => [UserRole_])
    @OneToMany(() => UserRole_, () => null)
    UserRoles: UserRole_[]; // Link to UserRoles

    @Field(() => [AuthorizationRole_])
    @OneToMany(() => AuthorizationRole_, () => null)
    AuthorizationRoles: AuthorizationRole_[]; // Link to AuthorizationRoles

}
        
//****************************************************************************
// INPUT TYPE for Roles   
//****************************************************************************
@InputType()
export class UpdateRoleInput {
    @Field(() => Int, )
    ID: number;

    @Field()
    Name: string;

    @Field({ nullable: true })
    Description: string;

    @Field({ nullable: true })
    AzureID: string;

    @Field()
    SQLName: string;
}

//****************************************************************************
// RESOLVER for Roles
//****************************************************************************
@ObjectType()
export class RunRoleViewResult {
    @Field(() => [Role_])
    Results: Role_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(Role_)
export class RoleResolver extends ResolverBase {
    @Query(() => RunRoleViewResult)
    async RunRoleViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunRoleViewResult)
    async RunRoleViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunRoleViewResult)
    async RunRoleDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Roles';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => Role_, { nullable: true })
    async Role(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<Role_ | null> {
        this.CheckUserReadPermissions('Roles', userPayload);
        const sSQL = `SELECT * FROM vwRoles WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Roles', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }

    @Query(() => [Role_])
    AllRoles(@Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Roles', userPayload);
        const sSQL = 'SELECT * FROM vwRoles' + this.getRowLevelSecurityWhereClause('Roles', userPayload, EntityPermissionType.Read, ' WHERE');
        return dataSource.query(sSQL);
    }
  
    @FieldResolver(() => [EmployeeRole_])
    async EmployeeRoles(@Root() role: Role_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Employee Roles', userPayload);
        const sSQL = `SELECT * FROM vwEmployeeRoles WHERE RoleID=${role.ID} ` + this.getRowLevelSecurityWhereClause('Employee Roles', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [EntityPermission_])
    async EntityPermissions(@Root() role: Role_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Entity Permissions', userPayload);
        const sSQL = `SELECT * FROM vwEntityPermissions WHERE RoleName=${role.ID} ` + this.getRowLevelSecurityWhereClause('Entity Permissions', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [UserRole_])
    async UserRoles(@Root() role: Role_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('User Roles', userPayload);
        const sSQL = `SELECT * FROM vwUserRoles WHERE RoleName=${role.ID} ` + this.getRowLevelSecurityWhereClause('User Roles', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [AuthorizationRole_])
    async AuthorizationRoles(@Root() role: Role_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Authorization Roles', userPayload);
        const sSQL = `SELECT * FROM vwAuthorizationRoles WHERE RoleName=${role.ID} ` + this.getRowLevelSecurityWhereClause('Authorization Roles', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
    
    @Mutation(() => Role_)
    async UpdateRole(
        @Arg('input', () => UpdateRoleInput) input: UpdateRoleInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Roles', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for Roles
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateRoleInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateRoleInput) {
        const i = input, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for Skills
//****************************************************************************
@ViewEntity({
   name: 'vwSkills',
   synchronize: false,
})
@ObjectType()
export class Skill_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field() 
    @MaxLength(100)
    @Column()
    Name: string;
      
    @Field() 
    @MaxLength(100)
    @Column()
    ParentID: string;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
      
    @Field() 
    @MaxLength(8)
    @Column()
    UpdatedAt: Date;
    
    @Field(() => [EmployeeSkill_])
    @OneToMany(() => EmployeeSkill_, () => null)
    EmployeeSkills: EmployeeSkill_[]; // Link to EmployeeSkills

}
//****************************************************************************
// RESOLVER for Skills
//****************************************************************************
@ObjectType()
export class RunSkillViewResult {
    @Field(() => [Skill_])
    Results: Skill_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(Skill_)
export class SkillResolver extends ResolverBase {
    @Query(() => RunSkillViewResult)
    async RunSkillViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunSkillViewResult)
    async RunSkillViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunSkillViewResult)
    async RunSkillDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Skills';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => Skill_, { nullable: true })
    async Skill(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<Skill_ | null> {
        this.CheckUserReadPermissions('Skills', userPayload);
        const sSQL = `SELECT * FROM vwSkills WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Skills', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }

    @Query(() => [Skill_])
    AllSkills(@Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Skills', userPayload);
        const sSQL = 'SELECT * FROM vwSkills' + this.getRowLevelSecurityWhereClause('Skills', userPayload, EntityPermissionType.Read, ' WHERE');
        return dataSource.query(sSQL);
    }
  
    @FieldResolver(() => [EmployeeSkill_])
    async EmployeeSkills(@Root() skill: Skill_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Employee Skills', userPayload);
        const sSQL = `SELECT * FROM vwEmployeeSkills WHERE SkillID=${skill.ID} ` + this.getRowLevelSecurityWhereClause('Employee Skills', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
    
}

//****************************************************************************
// ENTITY CLASS for Integration URL Formats
//****************************************************************************
@ViewEntity({
   name: 'vwIntegrationURLFormats',
   synchronize: false,
})
@ObjectType()
export class IntegrationURLFormat_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field({nullable: true}) 
    @MaxLength(200)
    @Column()
    IntegrationName?: string;
      
    @Field(() => Int) 
    @Column()
    EntityID: number;
      
    @Field() 
    @MaxLength(1000)
    @Column()
    URLFormat: string;
      
    @Field(() => Int) 
    @ViewColumn()
    IntegrationID: number;
      
    @Field() 
    @MaxLength(200)
    @ViewColumn()
    Integration: string;
      
    @Field({nullable: true}) 
    @MaxLength(1000)
    @ViewColumn()
    NavigationBaseURL?: string;
      
    @Field({nullable: true}) 
    @MaxLength(2000)
    @ViewColumn()
    FullURLFormat?: string;
    
}
        
//****************************************************************************
// INPUT TYPE for Integration URL Formats   
//****************************************************************************
@InputType()
export class UpdateIntegrationURLFormatInput {
    @Field(() => Int, )
    ID: number;

    @Field({ nullable: true })
    IntegrationName: string;

    @Field(() => Int, )
    EntityID: number;

    @Field()
    URLFormat: string;
}

//****************************************************************************
// RESOLVER for Integration URL Formats
//****************************************************************************
@ObjectType()
export class RunIntegrationURLFormatViewResult {
    @Field(() => [IntegrationURLFormat_])
    Results: IntegrationURLFormat_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(IntegrationURLFormat_)
export class IntegrationURLFormatResolver extends ResolverBase {
    @Query(() => RunIntegrationURLFormatViewResult)
    async RunIntegrationURLFormatViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunIntegrationURLFormatViewResult)
    async RunIntegrationURLFormatViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunIntegrationURLFormatViewResult)
    async RunIntegrationURLFormatDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Integration URL Formats';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => IntegrationURLFormat_, { nullable: true })
    async IntegrationURLFormat(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<IntegrationURLFormat_ | null> {
        this.CheckUserReadPermissions('Integration URL Formats', userPayload);
        const sSQL = `SELECT * FROM vwIntegrationURLFormats WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Integration URL Formats', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }

    @Query(() => [IntegrationURLFormat_])
    AllIntegrationURLFormats(@Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Integration URL Formats', userPayload);
        const sSQL = 'SELECT * FROM vwIntegrationURLFormats' + this.getRowLevelSecurityWhereClause('Integration URL Formats', userPayload, EntityPermissionType.Read, ' WHERE');
        return dataSource.query(sSQL);
    }

    @Mutation(() => IntegrationURLFormat_)
    async UpdateIntegrationURLFormat(
        @Arg('input', () => UpdateIntegrationURLFormatInput) input: UpdateIntegrationURLFormatInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Integration URL Formats', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for Integration URL Formats
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateIntegrationURLFormatInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateIntegrationURLFormatInput) {
        const i = input, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for Integrations
//****************************************************************************
@ViewEntity({
   name: 'vwIntegrations',
   synchronize: false,
})
@ObjectType({ description: 'List of integrations that can be executed using the MemberJunction integration architecture.' })
export class Integration_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field() 
    @MaxLength(200)
    @Column()
    Name: string;
      
    @Field({nullable: true}) 
    @MaxLength(510)
    @Column()
    Description?: string;
      
    @Field({nullable: true}) 
    @MaxLength(1000)
    @Column()
    NavigationBaseURL?: string;
      
    @Field({nullable: true}) 
    @MaxLength(200)
    @Column()
    ClassName?: string;
      
    @Field({nullable: true}) 
    @MaxLength(200)
    @Column()
    ImportPath?: string;
      
    @Field(() => Int) 
    @Column()
    BatchMaxRequestCount: number;
      
    @Field(() => Int) 
    @Column()
    BatchRequestWaitTime: number;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
      
    @Field() 
    @MaxLength(8)
    @Column()
    UpdatedAt: Date;
    
    @Field(() => [IntegrationURLFormat_])
    @OneToMany(() => IntegrationURLFormat_, () => null)
    IntegrationURLFormats: IntegrationURLFormat_[]; // Link to IntegrationURLFormats

    @Field(() => [CompanyIntegration_])
    @OneToMany(() => CompanyIntegration_, () => null)
    CompanyIntegrations: CompanyIntegration_[]; // Link to CompanyIntegrations

}
        
//****************************************************************************
// INPUT TYPE for Integrations   
//****************************************************************************
@InputType()
export class UpdateIntegrationInput {
    @Field(() => Int, )
    ID: number;

    @Field()
    Name: string;

    @Field({ nullable: true })
    Description: string;

    @Field({ nullable: true })
    NavigationBaseURL: string;

    @Field({ nullable: true })
    ClassName: string;

    @Field({ nullable: true })
    ImportPath: string;

    @Field(() => Int, )
    BatchMaxRequestCount: number;

    @Field(() => Int, )
    BatchRequestWaitTime: number;
}

//****************************************************************************
// RESOLVER for Integrations
//****************************************************************************
@ObjectType()
export class RunIntegrationViewResult {
    @Field(() => [Integration_])
    Results: Integration_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(Integration_)
export class IntegrationResolver extends ResolverBase {
    @Query(() => RunIntegrationViewResult)
    async RunIntegrationViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunIntegrationViewResult)
    async RunIntegrationViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunIntegrationViewResult)
    async RunIntegrationDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Integrations';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => Integration_, { nullable: true })
    async Integration(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<Integration_ | null> {
        this.CheckUserReadPermissions('Integrations', userPayload);
        const sSQL = `SELECT * FROM vwIntegrations WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Integrations', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }

    @Query(() => [Integration_])
    AllIntegrations(@Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Integrations', userPayload);
        const sSQL = 'SELECT * FROM vwIntegrations' + this.getRowLevelSecurityWhereClause('Integrations', userPayload, EntityPermissionType.Read, ' WHERE');
        return dataSource.query(sSQL);
    }
  
    @FieldResolver(() => [IntegrationURLFormat_])
    async IntegrationURLFormats(@Root() integration: Integration_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Integration URL Formats', userPayload);
        const sSQL = `SELECT * FROM vwIntegrationURLFormats WHERE IntegrationID=${integration.ID} ` + this.getRowLevelSecurityWhereClause('Integration URL Formats', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [CompanyIntegration_])
    async CompanyIntegrations(@Root() integration: Integration_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Company Integrations', userPayload);
        const sSQL = `SELECT * FROM vwCompanyIntegrations WHERE IntegrationName=${integration.ID} ` + this.getRowLevelSecurityWhereClause('Company Integrations', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
    
    @Mutation(() => Integration_)
    async UpdateIntegration(
        @Arg('input', () => UpdateIntegrationInput) input: UpdateIntegrationInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Integrations', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for Integrations
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateIntegrationInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateIntegrationInput) {
        const i = input, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for Company Integrations
//****************************************************************************
@ViewEntity({
   name: 'vwCompanyIntegrations',
   synchronize: false,
})
@ObjectType()
export class CompanyIntegration_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field() 
    @MaxLength(100)
    @Column()
    CompanyName: string;
      
    @Field() 
    @MaxLength(200)
    @Column()
    IntegrationName: string;
      
    @Field(() => Boolean, {nullable: true}) 
    @Column()
    IsActive?: boolean;
      
    @Field({nullable: true}) 
    @MaxLength(510)
    @Column()
    AccessToken?: string;
      
    @Field({nullable: true}) 
    @MaxLength(510)
    @Column()
    RefreshToken?: string;
      
    @Field({nullable: true}) 
    @MaxLength(8)
    @Column()
    TokenExpirationDate?: Date;
      
    @Field({nullable: true}) 
    @MaxLength(510)
    @Column()
    APIKey?: string;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
      
    @Field() 
    @MaxLength(8)
    @Column()
    UpdatedAt: Date;
      
    @Field({nullable: true}) 
    @MaxLength(200)
    @Column()
    ExternalSystemID?: string;
      
    @Field(() => Boolean) 
    @Column()
    IsExternalSystemReadOnly: boolean;
      
    @Field({nullable: true}) 
    @MaxLength(510)
    @Column()
    ClientID?: string;
      
    @Field({nullable: true}) 
    @MaxLength(510)
    @Column()
    ClientSecret?: string;
      
    @Field({nullable: true}) 
    @MaxLength(510)
    @Column()
    CustomAttribute1?: string;
      
    @Field(() => Int) 
    @ViewColumn()
    CompanyID: number;
      
    @Field(() => Int) 
    @ViewColumn()
    IntegrationID: number;
      
    @Field() 
    @MaxLength(100)
    @ViewColumn()
    Company: string;
      
    @Field() 
    @MaxLength(200)
    @ViewColumn()
    Integration: string;
      
    @Field({nullable: true}) 
    @MaxLength(200)
    @ViewColumn()
    DriverClassName?: string;
      
    @Field({nullable: true}) 
    @MaxLength(200)
    @ViewColumn()
    DriverImportPath?: string;
      
    @Field(() => Int, {nullable: true}) 
    @ViewColumn()
    LastRunID?: number;
      
    @Field({nullable: true}) 
    @MaxLength(8)
    @ViewColumn()
    LastRunStartedAt?: Date;
      
    @Field({nullable: true}) 
    @MaxLength(8)
    @ViewColumn()
    LastRunEndedAt?: Date;
    
    @Field(() => [List_])
    @OneToMany(() => List_, () => null)
    Lists: List_[]; // Link to Lists

    @Field(() => [EmployeeCompanyIntegration_])
    @OneToMany(() => EmployeeCompanyIntegration_, () => null)
    EmployeeCompanyIntegrations: EmployeeCompanyIntegration_[]; // Link to EmployeeCompanyIntegrations

    @Field(() => [CompanyIntegrationRun_])
    @OneToMany(() => CompanyIntegrationRun_, () => null)
    CompanyIntegrationRuns: CompanyIntegrationRun_[]; // Link to CompanyIntegrationRuns

    @Field(() => [CompanyIntegrationRecordMap_])
    @OneToMany(() => CompanyIntegrationRecordMap_, () => null)
    CompanyIntegrationRecordMaps: CompanyIntegrationRecordMap_[]; // Link to CompanyIntegrationRecordMaps

}
        
//****************************************************************************
// INPUT TYPE for Company Integrations   
//****************************************************************************
@InputType()
export class UpdateCompanyIntegrationInput {
    @Field(() => Int, )
    ID: number;

    @Field()
    CompanyName: string;

    @Field()
    IntegrationName: string;

    @Field(() => Boolean, { nullable: true })
    IsActive: boolean;

    @Field({ nullable: true })
    AccessToken: string;

    @Field({ nullable: true })
    RefreshToken: string;

    @Field({ nullable: true })
    TokenExpirationDate: Date;

    @Field({ nullable: true })
    APIKey: string;

    @Field({ nullable: true })
    ExternalSystemID: string;

    @Field(() => Boolean, )
    IsExternalSystemReadOnly: boolean;

    @Field({ nullable: true })
    ClientID: string;

    @Field({ nullable: true })
    ClientSecret: string;

    @Field({ nullable: true })
    CustomAttribute1: string;
}

//****************************************************************************
// RESOLVER for Company Integrations
//****************************************************************************
@ObjectType()
export class RunCompanyIntegrationViewResult {
    @Field(() => [CompanyIntegration_])
    Results: CompanyIntegration_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(CompanyIntegration_)
export class CompanyIntegrationResolver extends ResolverBase {
    @Query(() => RunCompanyIntegrationViewResult)
    async RunCompanyIntegrationViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunCompanyIntegrationViewResult)
    async RunCompanyIntegrationViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunCompanyIntegrationViewResult)
    async RunCompanyIntegrationDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Company Integrations';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => CompanyIntegration_, { nullable: true })
    async CompanyIntegration(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<CompanyIntegration_ | null> {
        this.CheckUserReadPermissions('Company Integrations', userPayload);
        const sSQL = `SELECT * FROM vwCompanyIntegrations WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Company Integrations', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }
  
    @FieldResolver(() => [List_])
    async Lists(@Root() companyintegration: CompanyIntegration_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Lists', userPayload);
        const sSQL = `SELECT * FROM vwLists WHERE CompanyIntegrationID=${companyintegration.ID} ` + this.getRowLevelSecurityWhereClause('Lists', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [EmployeeCompanyIntegration_])
    async EmployeeCompanyIntegrations(@Root() companyintegration: CompanyIntegration_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Employee Company Integrations', userPayload);
        const sSQL = `SELECT * FROM vwEmployeeCompanyIntegrations WHERE CompanyIntegrationID=${companyintegration.ID} ` + this.getRowLevelSecurityWhereClause('Employee Company Integrations', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [CompanyIntegrationRun_])
    async CompanyIntegrationRuns(@Root() companyintegration: CompanyIntegration_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Company Integration Runs', userPayload);
        const sSQL = `SELECT * FROM vwCompanyIntegrationRuns WHERE CompanyIntegrationID=${companyintegration.ID} ` + this.getRowLevelSecurityWhereClause('Company Integration Runs', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [CompanyIntegrationRecordMap_])
    async CompanyIntegrationRecordMaps(@Root() companyintegration: CompanyIntegration_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Company Integration Record Maps', userPayload);
        const sSQL = `SELECT * FROM vwCompanyIntegrationRecordMaps WHERE CompanyIntegrationID=${companyintegration.ID} ` + this.getRowLevelSecurityWhereClause('Company Integration Record Maps', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
    
    @Mutation(() => CompanyIntegration_)
    async UpdateCompanyIntegration(
        @Arg('input', () => UpdateCompanyIntegrationInput) input: UpdateCompanyIntegrationInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Company Integrations', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for Company Integrations
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateCompanyIntegrationInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateCompanyIntegrationInput) {
        const i = input, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for Entity Fields
//****************************************************************************
@ViewEntity({
   name: 'vwEntityFields',
   synchronize: false,
})
@ObjectType()
export class EntityField_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field(() => Int) 
    @Column()
    EntityID: number;
      
    @Field(() => Int) 
    @Column()
    Sequence: number;
      
    @Field() 
    @MaxLength(100)
    @Column()
    Name: string;
      
    @Field({nullable: true}) 
    @MaxLength(100)
    @Column()
    DisplayName?: string;
      
    @Field({nullable: true}) 
    @Column()
    Description?: string;
      
    @Field({nullable: true}) 
    @MaxLength(200)
    @Column()
    Category?: string;
      
    @Field() 
    @MaxLength(100)
    @Column()
    Type: string;
      
    @Field(() => Int, {nullable: true}) 
    @Column()
    Length?: number;
      
    @Field(() => Int, {nullable: true}) 
    @Column()
    Precision?: number;
      
    @Field(() => Int, {nullable: true}) 
    @Column()
    Scale?: number;
      
    @Field(() => Boolean) 
    @Column()
    AllowsNull: boolean;
      
    @Field({nullable: true}) 
    @MaxLength(200)
    @Column()
    DefaultValue?: string;
      
    @Field(() => Boolean) 
    @Column()
    AutoIncrement: boolean;
      
    @Field() 
    @MaxLength(40)
    @Column()
    ValueListType: string;
      
    @Field({nullable: true}) 
    @MaxLength(100)
    @Column()
    ExtendedType?: string;
      
    @Field(() => Boolean) 
    @Column()
    DefaultInView: boolean;
      
    @Field({nullable: true}) 
    @Column()
    ViewCellTemplate?: string;
      
    @Field(() => Int, {nullable: true}) 
    @Column()
    DefaultColumnWidth?: number;
      
    @Field(() => Boolean) 
    @Column()
    AllowUpdateAPI: boolean;
      
    @Field(() => Boolean) 
    @Column()
    AllowUpdateInView: boolean;
      
    @Field(() => Boolean) 
    @Column()
    IncludeInUserSearchAPI: boolean;
      
    @Field(() => Boolean) 
    @Column()
    FullTextSearchEnabled: boolean;
      
    @Field({nullable: true}) 
    @MaxLength(1000)
    @Column()
    UserSearchParamFormatAPI?: string;
      
    @Field(() => Boolean) 
    @Column()
    IncludeInGeneratedForm: boolean;
      
    @Field() 
    @MaxLength(20)
    @Column()
    GeneratedFormSection: string;
      
    @Field(() => Boolean) 
    @Column()
    IsVirtual: boolean;
      
    @Field(() => Boolean) 
    @Column()
    IsNameField: boolean;
      
    @Field(() => Int, {nullable: true}) 
    @Column()
    RelatedEntityID?: number;
      
    @Field({nullable: true}) 
    @MaxLength(100)
    @Column()
    RelatedEntityFieldName?: string;
      
    @Field(() => Boolean) 
    @Column()
    IncludeRelatedEntityNameFieldInBaseView: boolean;
      
    @Field({nullable: true}) 
    @MaxLength(100)
    @Column()
    RelatedEntityNameFieldMap?: string;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
      
    @Field() 
    @MaxLength(8)
    @Column()
    UpdatedAt: Date;
      
    @Field() 
    @MaxLength(100)
    @ViewColumn()
    Entity: string;
      
    @Field() 
    @MaxLength(50)
    @ViewColumn()
    SchemaName: string;
      
    @Field() 
    @MaxLength(100)
    @ViewColumn()
    BaseTable: string;
      
    @Field() 
    @MaxLength(100)
    @ViewColumn()
    BaseView: string;
      
    @Field({nullable: true}) 
    @MaxLength(8000)
    @ViewColumn()
    EntityCodeName?: string;
      
    @Field({nullable: true}) 
    @MaxLength(202)
    @ViewColumn()
    EntityClassName?: string;
      
    @Field({nullable: true}) 
    @MaxLength(100)
    @ViewColumn()
    RelatedEntity?: string;
      
    @Field({nullable: true}) 
    @MaxLength(50)
    @ViewColumn()
    RelatedEntitySchemaName?: string;
      
    @Field({nullable: true}) 
    @MaxLength(100)
    @ViewColumn()
    RelatedEntityBaseTable?: string;
      
    @Field({nullable: true}) 
    @MaxLength(100)
    @ViewColumn()
    RelatedEntityBaseView?: string;
      
    @Field({nullable: true}) 
    @MaxLength(8000)
    @ViewColumn()
    RelatedEntityCodeName?: string;
      
    @Field({nullable: true}) 
    @MaxLength(202)
    @ViewColumn()
    RelatedEntityClassName?: string;
    
    @Field(() => [EntityFieldValue_])
    @OneToMany(() => EntityFieldValue_, () => null)
    EntityFieldValues: EntityFieldValue_[]; // Link to EntityFieldValues

}
        
//****************************************************************************
// INPUT TYPE for Entity Fields   
//****************************************************************************
@InputType()
export class CreateEntityFieldInput {
    @Field({ nullable: true })
    DisplayName: string;

    @Field({ nullable: true })
    Description: string;

    @Field({ nullable: true })
    Category: string;

    @Field()
    ValueListType: string;

    @Field({ nullable: true })
    ExtendedType: string;

    @Field(() => Boolean, )
    DefaultInView: boolean;

    @Field({ nullable: true })
    ViewCellTemplate: string;

    @Field(() => Int, { nullable: true })
    DefaultColumnWidth: number;

    @Field(() => Boolean, )
    AllowUpdateAPI: boolean;

    @Field(() => Boolean, )
    AllowUpdateInView: boolean;

    @Field(() => Boolean, )
    IncludeInUserSearchAPI: boolean;

    @Field(() => Boolean, )
    FullTextSearchEnabled: boolean;

    @Field({ nullable: true })
    UserSearchParamFormatAPI: string;

    @Field(() => Boolean, )
    IncludeInGeneratedForm: boolean;

    @Field()
    GeneratedFormSection: string;

    @Field(() => Boolean, )
    IsNameField: boolean;

    @Field(() => Int, { nullable: true })
    RelatedEntityID: number;

    @Field({ nullable: true })
    RelatedEntityFieldName: string;

    @Field(() => Boolean, )
    IncludeRelatedEntityNameFieldInBaseView: boolean;

    @Field({ nullable: true })
    RelatedEntityNameFieldMap: string;
}

        
//****************************************************************************
// INPUT TYPE for Entity Fields   
//****************************************************************************
@InputType()
export class UpdateEntityFieldInput {
    @Field(() => Int, )
    ID: number;

    @Field({ nullable: true })
    DisplayName: string;

    @Field({ nullable: true })
    Description: string;

    @Field({ nullable: true })
    Category: string;

    @Field()
    ValueListType: string;

    @Field({ nullable: true })
    ExtendedType: string;

    @Field(() => Boolean, )
    DefaultInView: boolean;

    @Field({ nullable: true })
    ViewCellTemplate: string;

    @Field(() => Int, { nullable: true })
    DefaultColumnWidth: number;

    @Field(() => Boolean, )
    AllowUpdateAPI: boolean;

    @Field(() => Boolean, )
    AllowUpdateInView: boolean;

    @Field(() => Boolean, )
    IncludeInUserSearchAPI: boolean;

    @Field(() => Boolean, )
    FullTextSearchEnabled: boolean;

    @Field({ nullable: true })
    UserSearchParamFormatAPI: string;

    @Field(() => Boolean, )
    IncludeInGeneratedForm: boolean;

    @Field()
    GeneratedFormSection: string;

    @Field(() => Boolean, )
    IsNameField: boolean;

    @Field(() => Int, { nullable: true })
    RelatedEntityID: number;

    @Field({ nullable: true })
    RelatedEntityFieldName: string;

    @Field(() => Boolean, )
    IncludeRelatedEntityNameFieldInBaseView: boolean;

    @Field({ nullable: true })
    RelatedEntityNameFieldMap: string;
}

//****************************************************************************
// RESOLVER for Entity Fields
//****************************************************************************
@ObjectType()
export class RunEntityFieldViewResult {
    @Field(() => [EntityField_])
    Results: EntityField_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(EntityField_)
export class EntityFieldResolver extends ResolverBase {
    @Query(() => RunEntityFieldViewResult)
    async RunEntityFieldViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunEntityFieldViewResult)
    async RunEntityFieldViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunEntityFieldViewResult)
    async RunEntityFieldDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Entity Fields';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => EntityField_, { nullable: true })
    async EntityField(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<EntityField_ | null> {
        this.CheckUserReadPermissions('Entity Fields', userPayload);
        const sSQL = `SELECT * FROM vwEntityFields WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Entity Fields', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }

    @Query(() => [EntityField_])
    AllEntityFields(@Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Entity Fields', userPayload);
        const sSQL = 'SELECT * FROM vwEntityFields' + this.getRowLevelSecurityWhereClause('Entity Fields', userPayload, EntityPermissionType.Read, ' WHERE');
        return dataSource.query(sSQL);
    }
  
    @FieldResolver(() => [EntityFieldValue_])
    async EntityFieldValues(@Root() entityfield: EntityField_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Entity Field Values', userPayload);
        const sSQL = `SELECT * FROM vwEntityFieldValues WHERE EntityFieldID=${entityfield.ID} ` + this.getRowLevelSecurityWhereClause('Entity Field Values', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
    
    @Mutation(() => EntityField_)
    async CreateEntityField(
        @Arg('input', () => CreateEntityFieldInput) input: CreateEntityFieldInput,
        @Ctx() { dataSource, userPayload }: AppContext, 
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeCreate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Entity Fields', this.GetUserFromPayload(userPayload));
            await entityObject.NewRecord();
            entityObject.SetMany(input);
            if (await entityObject.Save()) {
                // save worked, fire the AfterCreate event and then return all the data
                await this.AfterCreate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else 
                // save failed, return null
                return null;
        }
        else    
            return null;
    }

    // Before/After CREATE Event Hooks for Sub-Classes to Override
    protected async BeforeCreate(dataSource: DataSource, input: CreateEntityFieldInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterCreate(dataSource: DataSource, input: CreateEntityFieldInput) {
        const i = input, d = dataSource; // prevent error
    }
    
    @Mutation(() => EntityField_)
    async UpdateEntityField(
        @Arg('input', () => UpdateEntityFieldInput) input: UpdateEntityFieldInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Entity Fields', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for Entity Fields
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateEntityFieldInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateEntityFieldInput) {
        const i = input, d = dataSource; // prevent error
    }

    @Mutation(() => Int)
    async DeleteEntityField(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        if (await this.BeforeDelete(dataSource, ID)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Entity Fields', this.GetUserFromPayload(userPayload));
            await entityObject.Load(ID)
            if (await entityObject.Delete()) {
                await this.AfterDelete(dataSource, ID); // fire event
                return ID;
            }
            else 
                return null; // delete failed
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeDelete(dataSource: DataSource, ID: number): Promise<boolean> {
        const i = ID, d = dataSource; // prevent error;
        return true;
    }
    protected async AfterDelete(dataSource: DataSource, ID: number) {
        const i = ID, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for Entities
//****************************************************************************
@ViewEntity({
   name: 'vwEntities',
   synchronize: false,
})
@ObjectType({ description: 'Metadata about all of the entities in the system. This information is managed by CodeGen, don\'t modify the parts that come from SQL Server' })
export class Entity_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field(() => Int, {nullable: true, description: 'Reserved for future use'}) 
    @Column()
    ParentID?: number;
      
    @Field() 
    @MaxLength(100)
    @Column()
    Name: string;
      
    @Field({nullable: true}) 
    @MaxLength(100)
    @Column()
    NameSuffix?: string;
      
    @Field({nullable: true}) 
    @Column()
    Description?: string;
      
    @Field() 
    @MaxLength(100)
    @Column()
    BaseTable: string;
      
    @Field() 
    @MaxLength(100)
    @Column()
    BaseView: string;
      
    @Field(() => Boolean) 
    @Column()
    BaseViewGenerated: boolean;
      
    @Field({description: 'Database Schema Name'}) 
    @MaxLength(50)
    @Column()
    SchemaName: string;
      
    @Field(() => Boolean) 
    @Column()
    VirtualEntity: boolean;
      
    @Field(() => Boolean) 
    @Column()
    TrackRecordChanges: boolean;
      
    @Field(() => Boolean) 
    @Column()
    AuditRecordAccess: boolean;
      
    @Field(() => Boolean) 
    @Column()
    AuditViewRuns: boolean;
      
    @Field(() => Boolean, {description: 'Master switch to control if the field is included in the API or not'}) 
    @Column()
    IncludeInAPI: boolean;
      
    @Field(() => Boolean) 
    @Column()
    AllowAllRowsAPI: boolean;
      
    @Field(() => Boolean, {description: 'If set to 1, allows updates to occur via API. Role based permissions are required in addition to turning this bit on.'}) 
    @Column()
    AllowUpdateAPI: boolean;
      
    @Field(() => Boolean) 
    @Column()
    AllowCreateAPI: boolean;
      
    @Field(() => Boolean) 
    @Column()
    AllowDeleteAPI: boolean;
      
    @Field(() => Boolean) 
    @Column()
    CustomResolverAPI: boolean;
      
    @Field(() => Boolean, {description: 'If set to 1, allows an end user to add their own search string when running a user view or searching without saving a view'}) 
    @Column()
    AllowUserSearchAPI: boolean;
      
    @Field(() => Boolean) 
    @Column()
    FullTextSearchEnabled: boolean;
      
    @Field({nullable: true}) 
    @MaxLength(100)
    @Column()
    FullTextCatalog?: string;
      
    @Field(() => Boolean) 
    @Column()
    FullTextCatalogGenerated: boolean;
      
    @Field({nullable: true}) 
    @MaxLength(200)
    @Column()
    FullTextIndex?: string;
      
    @Field(() => Boolean) 
    @Column()
    FullTextIndexGenerated: boolean;
      
    @Field({nullable: true}) 
    @MaxLength(200)
    @Column()
    FullTextSearchFunction?: string;
      
    @Field(() => Boolean) 
    @Column()
    FullTextSearchFunctionGenerated: boolean;
      
    @Field(() => Int, {nullable: true}) 
    @Column()
    UserViewMaxRows?: number;
      
    @Field({nullable: true}) 
    @MaxLength(200)
    @Column()
    spCreate?: string;
      
    @Field({nullable: true}) 
    @MaxLength(200)
    @Column()
    spUpdate?: string;
      
    @Field({nullable: true}) 
    @MaxLength(200)
    @Column()
    spDelete?: string;
      
    @Field(() => Boolean) 
    @Column()
    spCreateGenerated: boolean;
      
    @Field(() => Boolean) 
    @Column()
    spUpdateGenerated: boolean;
      
    @Field(() => Boolean) 
    @Column()
    spDeleteGenerated: boolean;
      
    @Field(() => Boolean) 
    @Column()
    CascadeDeletes: boolean;
      
    @Field(() => Boolean) 
    @Column()
    UserFormGenerated: boolean;
      
    @Field({nullable: true, description: 'Normally, CodeGen will sub-class BaseEntity to create a strongly-typed sub-class for each entity. If you provide a value here and in EntityObjectSubclassImport, CodeGen will sub-class the provided class instead of BaseEntity. Also make sure to provide a value for EntityObjectSubclassImport with the name of the module to import that contains an exported class of the name you provide in EntityObjectSubclassName.'}) 
    @MaxLength(200)
    @Column()
    EntityObjectSubclassName?: string;
      
    @Field({nullable: true, description: 'Normally, CodeGen will sub-class BaseEntity to create a strongly-typed sub-class for each entity. If you provide a value here and in EntityObjectSubclassName, CodeGen will sub-class the provided class instead of BaseEntity. Also make sure to provide a value for EntityObjectSubclassName with the name of the class itself. This field should have the name of the module  to import that contains an exported class of the name you provide in EntityObjectSubclassName.'}) 
    @MaxLength(200)
    @Column()
    EntityObjectSubclassImport?: string;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
      
    @Field() 
    @MaxLength(8)
    @Column()
    UpdatedAt: Date;
      
    @Field({nullable: true}) 
    @MaxLength(8000)
    @ViewColumn()
    CodeName?: string;
      
    @Field({nullable: true}) 
    @MaxLength(202)
    @ViewColumn()
    ClassName?: string;
      
    @Field({nullable: true}) 
    @MaxLength(202)
    @ViewColumn()
    BaseTableCodeName?: string;
      
    @Field({nullable: true}) 
    @MaxLength(100)
    @ViewColumn()
    ParentEntity?: string;
      
    @Field({nullable: true}) 
    @MaxLength(100)
    @ViewColumn()
    ParentBaseTable?: string;
      
    @Field({nullable: true}) 
    @MaxLength(100)
    @ViewColumn()
    ParentBaseView?: string;
    
    @Field(() => [EntityField_])
    @OneToMany(() => EntityField_, () => null)
    EntityFields: EntityField_[]; // Link to EntityFields

    @Field(() => [EntityPermission_])
    @OneToMany(() => EntityPermission_, () => null)
    EntityPermissions: EntityPermission_[]; // Link to EntityPermissions

    @Field(() => [EntityRelationship_])
    @OneToMany(() => EntityRelationship_, () => null)
    EntityRelationships: EntityRelationship_[]; // Link to EntityRelationships

    @Field(() => [EntityAIAction_])
    @OneToMany(() => EntityAIAction_, () => null)
    EntityAIActions: EntityAIAction_[]; // Link to EntityAIActions

    @Field(() => [UserRecordLog_])
    @OneToMany(() => UserRecordLog_, () => null)
    UserRecordLogs: UserRecordLog_[]; // Link to UserRecordLogs

    @Field(() => [IntegrationURLFormat_])
    @OneToMany(() => IntegrationURLFormat_, () => null)
    IntegrationURLFormats: IntegrationURLFormat_[]; // Link to IntegrationURLFormats

    @Field(() => [Entity_])
    @OneToMany(() => Entity_, () => null)
    Entities: Entity_[]; // Link to Entities

    @Field(() => [UserFavorite_])
    @OneToMany(() => UserFavorite_, () => null)
    UserFavorites: UserFavorite_[]; // Link to UserFavorites

    @Field(() => [CompanyIntegrationRunDetail_])
    @OneToMany(() => CompanyIntegrationRunDetail_, () => null)
    CompanyIntegrationRunDetails: CompanyIntegrationRunDetail_[]; // Link to CompanyIntegrationRunDetails

    @Field(() => [ApplicationEntity_])
    @OneToMany(() => ApplicationEntity_, () => null)
    ApplicationEntities: ApplicationEntity_[]; // Link to ApplicationEntities

    @Field(() => [UserApplicationEntity_])
    @OneToMany(() => UserApplicationEntity_, () => null)
    UserApplicationEntities: UserApplicationEntity_[]; // Link to UserApplicationEntities

    @Field(() => [List_])
    @OneToMany(() => List_, () => null)
    Lists: List_[]; // Link to Lists

    @Field(() => [UserView_])
    @OneToMany(() => UserView_, () => null)
    UserViews: UserView_[]; // Link to UserViews

    @Field(() => [RecordChange_])
    @OneToMany(() => RecordChange_, () => null)
    RecordChanges: RecordChange_[]; // Link to RecordChanges

    @Field(() => [AuditLog_])
    @OneToMany(() => AuditLog_, () => null)
    AuditLogs: AuditLog_[]; // Link to AuditLogs

    @Field(() => [ResourceType_])
    @OneToMany(() => ResourceType_, () => null)
    ResourceTypes: ResourceType_[]; // Link to ResourceTypes

    @Field(() => [TaggedItem_])
    @OneToMany(() => TaggedItem_, () => null)
    TaggedItems: TaggedItem_[]; // Link to TaggedItems

    @Field(() => [DatasetItem_])
    @OneToMany(() => DatasetItem_, () => null)
    DatasetItems: DatasetItem_[]; // Link to DatasetItems

    @Field(() => [CompanyIntegrationRecordMap_])
    @OneToMany(() => CompanyIntegrationRecordMap_, () => null)
    CompanyIntegrationRecordMaps: CompanyIntegrationRecordMap_[]; // Link to CompanyIntegrationRecordMaps

    @Field(() => [RecordMergeLog_])
    @OneToMany(() => RecordMergeLog_, () => null)
    RecordMergeLogs: RecordMergeLog_[]; // Link to RecordMergeLogs

}
        
//****************************************************************************
// INPUT TYPE for Entities   
//****************************************************************************
@InputType()
export class CreateEntityInput {
    @Field(() => Int, { nullable: true })
    ParentID: number;

    @Field()
    Name: string;

    @Field({ nullable: true })
    NameSuffix: string;

    @Field({ nullable: true })
    Description: string;

    @Field()
    BaseView: string;

    @Field(() => Boolean, )
    BaseViewGenerated: boolean;

    @Field(() => Boolean, )
    VirtualEntity: boolean;

    @Field(() => Boolean, )
    TrackRecordChanges: boolean;

    @Field(() => Boolean, )
    AuditRecordAccess: boolean;

    @Field(() => Boolean, )
    AuditViewRuns: boolean;

    @Field(() => Boolean, )
    IncludeInAPI: boolean;

    @Field(() => Boolean, )
    AllowAllRowsAPI: boolean;

    @Field(() => Boolean, )
    AllowUpdateAPI: boolean;

    @Field(() => Boolean, )
    AllowCreateAPI: boolean;

    @Field(() => Boolean, )
    AllowDeleteAPI: boolean;

    @Field(() => Boolean, )
    CustomResolverAPI: boolean;

    @Field(() => Boolean, )
    AllowUserSearchAPI: boolean;

    @Field(() => Boolean, )
    FullTextSearchEnabled: boolean;

    @Field({ nullable: true })
    FullTextCatalog: string;

    @Field(() => Boolean, )
    FullTextCatalogGenerated: boolean;

    @Field({ nullable: true })
    FullTextIndex: string;

    @Field(() => Boolean, )
    FullTextIndexGenerated: boolean;

    @Field({ nullable: true })
    FullTextSearchFunction: string;

    @Field(() => Boolean, )
    FullTextSearchFunctionGenerated: boolean;

    @Field(() => Int, { nullable: true })
    UserViewMaxRows: number;

    @Field({ nullable: true })
    spCreate: string;

    @Field({ nullable: true })
    spUpdate: string;

    @Field({ nullable: true })
    spDelete: string;

    @Field(() => Boolean, )
    spCreateGenerated: boolean;

    @Field(() => Boolean, )
    spUpdateGenerated: boolean;

    @Field(() => Boolean, )
    spDeleteGenerated: boolean;

    @Field(() => Boolean, )
    CascadeDeletes: boolean;

    @Field(() => Boolean, )
    UserFormGenerated: boolean;

    @Field({ nullable: true })
    EntityObjectSubclassName: string;

    @Field({ nullable: true })
    EntityObjectSubclassImport: string;
}

        
//****************************************************************************
// INPUT TYPE for Entities   
//****************************************************************************
@InputType()
export class UpdateEntityInput {
    @Field(() => Int, )
    ID: number;

    @Field(() => Int, { nullable: true })
    ParentID: number;

    @Field()
    Name: string;

    @Field({ nullable: true })
    NameSuffix: string;

    @Field({ nullable: true })
    Description: string;

    @Field()
    BaseView: string;

    @Field(() => Boolean, )
    BaseViewGenerated: boolean;

    @Field(() => Boolean, )
    VirtualEntity: boolean;

    @Field(() => Boolean, )
    TrackRecordChanges: boolean;

    @Field(() => Boolean, )
    AuditRecordAccess: boolean;

    @Field(() => Boolean, )
    AuditViewRuns: boolean;

    @Field(() => Boolean, )
    IncludeInAPI: boolean;

    @Field(() => Boolean, )
    AllowAllRowsAPI: boolean;

    @Field(() => Boolean, )
    AllowUpdateAPI: boolean;

    @Field(() => Boolean, )
    AllowCreateAPI: boolean;

    @Field(() => Boolean, )
    AllowDeleteAPI: boolean;

    @Field(() => Boolean, )
    CustomResolverAPI: boolean;

    @Field(() => Boolean, )
    AllowUserSearchAPI: boolean;

    @Field(() => Boolean, )
    FullTextSearchEnabled: boolean;

    @Field({ nullable: true })
    FullTextCatalog: string;

    @Field(() => Boolean, )
    FullTextCatalogGenerated: boolean;

    @Field({ nullable: true })
    FullTextIndex: string;

    @Field(() => Boolean, )
    FullTextIndexGenerated: boolean;

    @Field({ nullable: true })
    FullTextSearchFunction: string;

    @Field(() => Boolean, )
    FullTextSearchFunctionGenerated: boolean;

    @Field(() => Int, { nullable: true })
    UserViewMaxRows: number;

    @Field({ nullable: true })
    spCreate: string;

    @Field({ nullable: true })
    spUpdate: string;

    @Field({ nullable: true })
    spDelete: string;

    @Field(() => Boolean, )
    spCreateGenerated: boolean;

    @Field(() => Boolean, )
    spUpdateGenerated: boolean;

    @Field(() => Boolean, )
    spDeleteGenerated: boolean;

    @Field(() => Boolean, )
    CascadeDeletes: boolean;

    @Field(() => Boolean, )
    UserFormGenerated: boolean;

    @Field({ nullable: true })
    EntityObjectSubclassName: string;

    @Field({ nullable: true })
    EntityObjectSubclassImport: string;
}

//****************************************************************************
// RESOLVER for Entities
//****************************************************************************
@ObjectType()
export class RunEntityViewResult {
    @Field(() => [Entity_])
    Results: Entity_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(Entity_)
export class EntityResolverBase extends ResolverBase {
    @Query(() => RunEntityViewResult)
    async RunEntityViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunEntityViewResult)
    async RunEntityViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunEntityViewResult)
    async RunEntityDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Entities';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => Entity_, { nullable: true })
    async Entity(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<Entity_ | null> {
        this.CheckUserReadPermissions('Entities', userPayload);
        const sSQL = `SELECT * FROM vwEntities WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Entities', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }

    @Query(() => [Entity_])
    AllEntities(@Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Entities', userPayload);
        const sSQL = 'SELECT * FROM vwEntities' + this.getRowLevelSecurityWhereClause('Entities', userPayload, EntityPermissionType.Read, ' WHERE');
        return dataSource.query(sSQL);
    }
  
    @FieldResolver(() => [EntityField_])
    async EntityFields(@Root() entity: Entity_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Entity Fields', userPayload);
        const sSQL = `SELECT * FROM vwEntityFields WHERE EntityID=${entity.ID} ` + this.getRowLevelSecurityWhereClause('Entity Fields', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [EntityPermission_])
    async EntityPermissions(@Root() entity: Entity_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Entity Permissions', userPayload);
        const sSQL = `SELECT * FROM vwEntityPermissions WHERE EntityID=${entity.ID} ` + this.getRowLevelSecurityWhereClause('Entity Permissions', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [EntityRelationship_])
    async EntityRelationships(@Root() entity: Entity_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Entity Relationships', userPayload);
        const sSQL = `SELECT * FROM vwEntityRelationships WHERE EntityID=${entity.ID} ` + this.getRowLevelSecurityWhereClause('Entity Relationships', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [EntityAIAction_])
    async EntityAIActions(@Root() entity: Entity_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Entity AI Actions', userPayload);
        const sSQL = `SELECT * FROM vwEntityAIActions WHERE EntityID=${entity.ID} ` + this.getRowLevelSecurityWhereClause('Entity AI Actions', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [UserRecordLog_])
    async UserRecordLogs(@Root() entity: Entity_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('User Record Logs', userPayload);
        const sSQL = `SELECT * FROM vwUserRecordLogs WHERE EntityID=${entity.ID} ` + this.getRowLevelSecurityWhereClause('User Record Logs', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [IntegrationURLFormat_])
    async IntegrationURLFormats(@Root() entity: Entity_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Integration URL Formats', userPayload);
        const sSQL = `SELECT * FROM vwIntegrationURLFormats WHERE EntityID=${entity.ID} ` + this.getRowLevelSecurityWhereClause('Integration URL Formats', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [Entity_])
    async Entities(@Root() entity: Entity_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Entities', userPayload);
        const sSQL = `SELECT * FROM vwEntities WHERE ParentID=${entity.ID} ` + this.getRowLevelSecurityWhereClause('Entities', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [UserFavorite_])
    async UserFavorites(@Root() entity: Entity_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('User Favorites', userPayload);
        const sSQL = `SELECT * FROM vwUserFavorites WHERE EntityID=${entity.ID} ` + this.getRowLevelSecurityWhereClause('User Favorites', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [CompanyIntegrationRunDetail_])
    async CompanyIntegrationRunDetails(@Root() entity: Entity_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Company Integration Run Details', userPayload);
        const sSQL = `SELECT * FROM vwCompanyIntegrationRunDetails WHERE EntityID=${entity.ID} ` + this.getRowLevelSecurityWhereClause('Company Integration Run Details', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [ApplicationEntity_])
    async ApplicationEntities(@Root() entity: Entity_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Application Entities', userPayload);
        const sSQL = `SELECT * FROM vwApplicationEntities WHERE EntityID=${entity.ID} ` + this.getRowLevelSecurityWhereClause('Application Entities', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [UserApplicationEntity_])
    async UserApplicationEntities(@Root() entity: Entity_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('User Application Entities', userPayload);
        const sSQL = `SELECT * FROM vwUserApplicationEntities WHERE EntityID=${entity.ID} ` + this.getRowLevelSecurityWhereClause('User Application Entities', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [List_])
    async Lists(@Root() entity: Entity_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Lists', userPayload);
        const sSQL = `SELECT * FROM vwLists WHERE EntityID=${entity.ID} ` + this.getRowLevelSecurityWhereClause('Lists', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [UserView_])
    async UserViews(@Root() entity: Entity_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('User Views', userPayload);
        const sSQL = `SELECT * FROM vwUserViews WHERE EntityID=${entity.ID} ` + this.getRowLevelSecurityWhereClause('User Views', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [RecordChange_])
    async RecordChanges(@Root() entity: Entity_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Record Changes', userPayload);
        const sSQL = `SELECT * FROM vwRecordChanges WHERE EntityID=${entity.ID} ` + this.getRowLevelSecurityWhereClause('Record Changes', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [AuditLog_])
    async AuditLogs(@Root() entity: Entity_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Audit Logs', userPayload);
        const sSQL = `SELECT * FROM vwAuditLogs WHERE EntityID=${entity.ID} ` + this.getRowLevelSecurityWhereClause('Audit Logs', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [ResourceType_])
    async ResourceTypes(@Root() entity: Entity_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Resource Types', userPayload);
        const sSQL = `SELECT * FROM vwResourceTypes WHERE EntityID=${entity.ID} ` + this.getRowLevelSecurityWhereClause('Resource Types', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [TaggedItem_])
    async TaggedItems(@Root() entity: Entity_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Tagged Items', userPayload);
        const sSQL = `SELECT * FROM vwTaggedItems WHERE EntityID=${entity.ID} ` + this.getRowLevelSecurityWhereClause('Tagged Items', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [DatasetItem_])
    async DatasetItems(@Root() entity: Entity_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Dataset Items', userPayload);
        const sSQL = `SELECT * FROM vwDatasetItems WHERE EntityID=${entity.ID} ` + this.getRowLevelSecurityWhereClause('Dataset Items', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [CompanyIntegrationRecordMap_])
    async CompanyIntegrationRecordMaps(@Root() entity: Entity_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Company Integration Record Maps', userPayload);
        const sSQL = `SELECT * FROM vwCompanyIntegrationRecordMaps WHERE EntityID=${entity.ID} ` + this.getRowLevelSecurityWhereClause('Company Integration Record Maps', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [RecordMergeLog_])
    async RecordMergeLogs(@Root() entity: Entity_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Record Merge Logs', userPayload);
        const sSQL = `SELECT * FROM vwRecordMergeLogs WHERE EntityID=${entity.ID} ` + this.getRowLevelSecurityWhereClause('Record Merge Logs', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
    
    @Mutation(() => Entity_)
    async CreateEntity(
        @Arg('input', () => CreateEntityInput) input: CreateEntityInput,
        @Ctx() { dataSource, userPayload }: AppContext, 
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeCreate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Entities', this.GetUserFromPayload(userPayload));
            await entityObject.NewRecord();
            entityObject.SetMany(input);
            if (await entityObject.Save()) {
                // save worked, fire the AfterCreate event and then return all the data
                await this.AfterCreate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else 
                // save failed, return null
                return null;
        }
        else    
            return null;
    }

    // Before/After CREATE Event Hooks for Sub-Classes to Override
    protected async BeforeCreate(dataSource: DataSource, input: CreateEntityInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterCreate(dataSource: DataSource, input: CreateEntityInput) {
        const i = input, d = dataSource; // prevent error
    }
    
    @Mutation(() => Entity_)
    async UpdateEntity(
        @Arg('input', () => UpdateEntityInput) input: UpdateEntityInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Entities', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for Entities
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateEntityInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateEntityInput) {
        const i = input, d = dataSource; // prevent error
    }

    @Mutation(() => Int)
    async DeleteEntity(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        if (await this.BeforeDelete(dataSource, ID)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Entities', this.GetUserFromPayload(userPayload));
            await entityObject.Load(ID)
            if (await entityObject.Delete()) {
                await this.AfterDelete(dataSource, ID); // fire event
                return ID;
            }
            else 
                return null; // delete failed
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeDelete(dataSource: DataSource, ID: number): Promise<boolean> {
        const i = ID, d = dataSource; // prevent error;
        return true;
    }
    protected async AfterDelete(dataSource: DataSource, ID: number) {
        const i = ID, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for Users
//****************************************************************************
@ViewEntity({
   name: 'vwUsers',
   synchronize: false,
})
@ObjectType()
export class User_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field() 
    @MaxLength(200)
    @Column()
    Name: string;
      
    @Field({nullable: true}) 
    @MaxLength(100)
    @Column()
    FirstName?: string;
      
    @Field({nullable: true}) 
    @MaxLength(100)
    @Column()
    LastName?: string;
      
    @Field({nullable: true}) 
    @MaxLength(100)
    @Column()
    Title?: string;
      
    @Field() 
    @MaxLength(200)
    @Column()
    Email: string;
      
    @Field() 
    @MaxLength(30)
    @Column()
    Type: string;
      
    @Field(() => Boolean) 
    @Column()
    IsActive: boolean;
      
    @Field() 
    @MaxLength(20)
    @Column()
    LinkedRecordType: string;
      
    @Field(() => Int, {nullable: true}) 
    @Column()
    EmployeeID?: number;
      
    @Field(() => Int, {nullable: true}) 
    @Column()
    LinkedEntityID?: number;
      
    @Field(() => Int, {nullable: true}) 
    @Column()
    LinkedEntityRecordID?: number;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
      
    @Field() 
    @MaxLength(8)
    @Column()
    UpdatedAt: Date;
      
    @Field({nullable: true}) 
    @MaxLength(202)
    @ViewColumn()
    FirstLast?: string;
      
    @Field({nullable: true}) 
    @MaxLength(162)
    @ViewColumn()
    EmployeeFirstLast?: string;
      
    @Field({nullable: true}) 
    @MaxLength(200)
    @ViewColumn()
    EmployeeEmail?: string;
      
    @Field({nullable: true}) 
    @MaxLength(100)
    @ViewColumn()
    EmployeeTitle?: string;
      
    @Field({nullable: true}) 
    @MaxLength(162)
    @ViewColumn()
    EmployeeSupervisor?: string;
      
    @Field({nullable: true}) 
    @MaxLength(200)
    @ViewColumn()
    EmployeeSupervisorEmail?: string;
    
    @Field(() => [UserApplication_])
    @OneToMany(() => UserApplication_, () => null)
    UserApplications: UserApplication_[]; // Link to UserApplications

    @Field(() => [UserRole_])
    @OneToMany(() => UserRole_, () => null)
    UserRoles: UserRole_[]; // Link to UserRoles

    @Field(() => [Workspace_])
    @OneToMany(() => Workspace_, () => null)
    Workspaces: Workspace_[]; // Link to Workspaces

    @Field(() => [Report_])
    @OneToMany(() => Report_, () => null)
    Reports: Report_[]; // Link to Reports

    @Field(() => [ReportSnapshot_])
    @OneToMany(() => ReportSnapshot_, () => null)
    ReportSnapshots: ReportSnapshot_[]; // Link to ReportSnapshots

    @Field(() => [RecordChange_])
    @OneToMany(() => RecordChange_, () => null)
    RecordChanges: RecordChange_[]; // Link to RecordChanges

    @Field(() => [Dashboard_])
    @OneToMany(() => Dashboard_, () => null)
    Dashboards: Dashboard_[]; // Link to Dashboards

    @Field(() => [UserViewRun_])
    @OneToMany(() => UserViewRun_, () => null)
    UserViewRuns: UserViewRun_[]; // Link to UserViewRuns

    @Field(() => [AuditLog_])
    @OneToMany(() => AuditLog_, () => null)
    AuditLogs: AuditLog_[]; // Link to AuditLogs

    @Field(() => [List_])
    @OneToMany(() => List_, () => null)
    Lists: List_[]; // Link to Lists

    @Field(() => [UserFavorite_])
    @OneToMany(() => UserFavorite_, () => null)
    UserFavorites: UserFavorite_[]; // Link to UserFavorites

    @Field(() => [UserRecordLog_])
    @OneToMany(() => UserRecordLog_, () => null)
    UserRecordLogs: UserRecordLog_[]; // Link to UserRecordLogs

    @Field(() => [UserView_])
    @OneToMany(() => UserView_, () => null)
    UserViews: UserView_[]; // Link to UserViews

    @Field(() => [CompanyIntegrationRun_])
    @OneToMany(() => CompanyIntegrationRun_, () => null)
    CompanyIntegrationRuns: CompanyIntegrationRun_[]; // Link to CompanyIntegrationRuns

    @Field(() => [UserNotification_])
    @OneToMany(() => UserNotification_, () => null)
    UserNotifications: UserNotification_[]; // Link to UserNotifications

    @Field(() => [Conversation_])
    @OneToMany(() => Conversation_, () => null)
    Conversations: Conversation_[]; // Link to Conversations

    @Field(() => [ResourceFolder_])
    @OneToMany(() => ResourceFolder_, () => null)
    ResourceFolders: ResourceFolder_[]; // Link to ResourceFolders

    @Field(() => [RecordMergeLog_])
    @OneToMany(() => RecordMergeLog_, () => null)
    RecordMergeLogs: RecordMergeLog_[]; // Link to RecordMergeLogs

}
        
//****************************************************************************
// INPUT TYPE for Users   
//****************************************************************************
@InputType()
export class CreateUserInput {
    @Field()
    Name: string;

    @Field({ nullable: true })
    FirstName: string;

    @Field({ nullable: true })
    LastName: string;

    @Field({ nullable: true })
    Title: string;

    @Field()
    Email: string;

    @Field()
    Type: string;

    @Field(() => Boolean, )
    IsActive: boolean;

    @Field()
    LinkedRecordType: string;

    @Field(() => Int, { nullable: true })
    EmployeeID: number;

    @Field(() => Int, { nullable: true })
    LinkedEntityID: number;

    @Field(() => Int, { nullable: true })
    LinkedEntityRecordID: number;
}

        
//****************************************************************************
// INPUT TYPE for Users   
//****************************************************************************
@InputType()
export class UpdateUserInput {
    @Field(() => Int, )
    ID: number;

    @Field()
    Name: string;

    @Field({ nullable: true })
    FirstName: string;

    @Field({ nullable: true })
    LastName: string;

    @Field({ nullable: true })
    Title: string;

    @Field()
    Email: string;

    @Field()
    Type: string;

    @Field(() => Boolean, )
    IsActive: boolean;

    @Field()
    LinkedRecordType: string;

    @Field(() => Int, { nullable: true })
    EmployeeID: number;

    @Field(() => Int, { nullable: true })
    LinkedEntityID: number;

    @Field(() => Int, { nullable: true })
    LinkedEntityRecordID: number;
}

//****************************************************************************
// RESOLVER for Users
//****************************************************************************
@ObjectType()
export class RunUserViewResult {
    @Field(() => [User_])
    Results: User_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(User_)
export class UserResolverBase extends ResolverBase {
    @Query(() => RunUserViewResult)
    async RunUserViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunUserViewResult)
    async RunUserViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunUserViewResult)
    async RunUserDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Users';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => User_, { nullable: true })
    async User(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<User_ | null> {
        this.CheckUserReadPermissions('Users', userPayload);
        const sSQL = `SELECT * FROM vwUsers WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Users', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }

    @Query(() => [User_])
    AllUsers(@Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Users', userPayload);
        const sSQL = 'SELECT * FROM vwUsers' + this.getRowLevelSecurityWhereClause('Users', userPayload, EntityPermissionType.Read, ' WHERE');
        return dataSource.query(sSQL);
    }
  
    @FieldResolver(() => [UserApplication_])
    async UserApplications(@Root() user: User_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('User Applications', userPayload);
        const sSQL = `SELECT * FROM vwUserApplications WHERE UserID=${user.ID} ` + this.getRowLevelSecurityWhereClause('User Applications', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [UserRole_])
    async UserRoles(@Root() user: User_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('User Roles', userPayload);
        const sSQL = `SELECT * FROM vwUserRoles WHERE UserID=${user.ID} ` + this.getRowLevelSecurityWhereClause('User Roles', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [Workspace_])
    async Workspaces(@Root() user: User_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Workspaces', userPayload);
        const sSQL = `SELECT * FROM vwWorkspaces WHERE UserID=${user.ID} ` + this.getRowLevelSecurityWhereClause('Workspaces', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [Report_])
    async Reports(@Root() user: User_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Reports', userPayload);
        const sSQL = `SELECT * FROM vwReports WHERE UserID=${user.ID} ` + this.getRowLevelSecurityWhereClause('Reports', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [ReportSnapshot_])
    async ReportSnapshots(@Root() user: User_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Report Snapshots', userPayload);
        const sSQL = `SELECT * FROM vwReportSnapshots WHERE UserID=${user.ID} ` + this.getRowLevelSecurityWhereClause('Report Snapshots', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [RecordChange_])
    async RecordChanges(@Root() user: User_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Record Changes', userPayload);
        const sSQL = `SELECT * FROM vwRecordChanges WHERE UserID=${user.ID} ` + this.getRowLevelSecurityWhereClause('Record Changes', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [Dashboard_])
    async Dashboards(@Root() user: User_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Dashboards', userPayload);
        const sSQL = `SELECT * FROM vwDashboards WHERE UserID=${user.ID} ` + this.getRowLevelSecurityWhereClause('Dashboards', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [UserViewRun_])
    async UserViewRuns(@Root() user: User_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('User View Runs', userPayload);
        const sSQL = `SELECT * FROM vwUserViewRuns WHERE RunByUserID=${user.ID} ` + this.getRowLevelSecurityWhereClause('User View Runs', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [AuditLog_])
    async AuditLogs(@Root() user: User_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Audit Logs', userPayload);
        const sSQL = `SELECT * FROM vwAuditLogs WHERE UserID=${user.ID} ` + this.getRowLevelSecurityWhereClause('Audit Logs', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [List_])
    async Lists(@Root() user: User_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Lists', userPayload);
        const sSQL = `SELECT * FROM vwLists WHERE UserID=${user.ID} ` + this.getRowLevelSecurityWhereClause('Lists', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [UserFavorite_])
    async UserFavorites(@Root() user: User_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('User Favorites', userPayload);
        const sSQL = `SELECT * FROM vwUserFavorites WHERE UserID=${user.ID} ` + this.getRowLevelSecurityWhereClause('User Favorites', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [UserRecordLog_])
    async UserRecordLogs(@Root() user: User_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('User Record Logs', userPayload);
        const sSQL = `SELECT * FROM vwUserRecordLogs WHERE UserID=${user.ID} ` + this.getRowLevelSecurityWhereClause('User Record Logs', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [UserView_])
    async UserViews(@Root() user: User_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('User Views', userPayload);
        const sSQL = `SELECT * FROM vwUserViews WHERE UserID=${user.ID} ` + this.getRowLevelSecurityWhereClause('User Views', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [CompanyIntegrationRun_])
    async CompanyIntegrationRuns(@Root() user: User_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Company Integration Runs', userPayload);
        const sSQL = `SELECT * FROM vwCompanyIntegrationRuns WHERE RunByUserID=${user.ID} ` + this.getRowLevelSecurityWhereClause('Company Integration Runs', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [UserNotification_])
    async UserNotifications(@Root() user: User_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('User Notifications', userPayload);
        const sSQL = `SELECT * FROM vwUserNotifications WHERE UserID=${user.ID} ` + this.getRowLevelSecurityWhereClause('User Notifications', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [Conversation_])
    async Conversations(@Root() user: User_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Conversations', userPayload);
        const sSQL = `SELECT * FROM vwConversations WHERE UserID=${user.ID} ` + this.getRowLevelSecurityWhereClause('Conversations', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [ResourceFolder_])
    async ResourceFolders(@Root() user: User_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Resource Folders', userPayload);
        const sSQL = `SELECT * FROM vwResourceFolders WHERE UserID=${user.ID} ` + this.getRowLevelSecurityWhereClause('Resource Folders', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [RecordMergeLog_])
    async RecordMergeLogs(@Root() user: User_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Record Merge Logs', userPayload);
        const sSQL = `SELECT * FROM vwRecordMergeLogs WHERE InitiatedByUserID=${user.ID} ` + this.getRowLevelSecurityWhereClause('Record Merge Logs', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
    
    @Mutation(() => User_)
    async CreateUser(
        @Arg('input', () => CreateUserInput) input: CreateUserInput,
        @Ctx() { dataSource, userPayload }: AppContext, 
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeCreate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Users', this.GetUserFromPayload(userPayload));
            await entityObject.NewRecord();
            entityObject.SetMany(input);
            if (await entityObject.Save()) {
                // save worked, fire the AfterCreate event and then return all the data
                await this.AfterCreate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else 
                // save failed, return null
                return null;
        }
        else    
            return null;
    }

    // Before/After CREATE Event Hooks for Sub-Classes to Override
    protected async BeforeCreate(dataSource: DataSource, input: CreateUserInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterCreate(dataSource: DataSource, input: CreateUserInput) {
        const i = input, d = dataSource; // prevent error
    }
    
    @Mutation(() => User_)
    async UpdateUser(
        @Arg('input', () => UpdateUserInput) input: UpdateUserInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Users', this.GetUserFromPayload(userPayload));
            await entityObject.Load(input.ID) // Track Changes is turned on, so we need to get the latest data from DB first before we save
            entityObject.SetMany(input);
            if (await entityObject.Save()) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateUserInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateUserInput) {
        const i = input, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for Entity Relationships
//****************************************************************************
@ViewEntity({
   name: 'vwEntityRelationships',
   synchronize: false,
})
@ObjectType()
export class EntityRelationship_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field(() => Int) 
    @Column()
    EntityID: number;
      
    @Field(() => Int) 
    @Column()
    RelatedEntityID: number;
      
    @Field(() => Boolean) 
    @Column()
    BundleInAPI: boolean;
      
    @Field(() => Boolean) 
    @Column()
    IncludeInParentAllQuery: boolean;
      
    @Field() 
    @MaxLength(40)
    @Column()
    Type: string;
      
    @Field({nullable: true}) 
    @MaxLength(100)
    @Column()
    EntityKeyField?: string;
      
    @Field() 
    @MaxLength(100)
    @Column()
    RelatedEntityJoinField: string;
      
    @Field({nullable: true}) 
    @MaxLength(100)
    @Column()
    JoinView?: string;
      
    @Field({nullable: true}) 
    @MaxLength(100)
    @Column()
    JoinEntityJoinField?: string;
      
    @Field({nullable: true}) 
    @MaxLength(100)
    @Column()
    JoinEntityInverseJoinField?: string;
      
    @Field(() => Boolean) 
    @Column()
    DisplayInForm: boolean;
      
    @Field({nullable: true}) 
    @MaxLength(100)
    @Column()
    DisplayName?: string;
      
    @Field({nullable: true}) 
    @MaxLength(16)
    @Column()
    DisplayUserViewGUID?: string;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
      
    @Field() 
    @MaxLength(8)
    @Column()
    UpdatedAt: Date;
      
    @Field() 
    @MaxLength(100)
    @ViewColumn()
    Entity: string;
      
    @Field() 
    @MaxLength(100)
    @ViewColumn()
    EntityBaseTable: string;
      
    @Field() 
    @MaxLength(100)
    @ViewColumn()
    EntityBaseView: string;
      
    @Field() 
    @MaxLength(100)
    @ViewColumn()
    RelatedEntity: string;
      
    @Field() 
    @MaxLength(100)
    @ViewColumn()
    RelatedEntityBaseTable: string;
      
    @Field() 
    @MaxLength(100)
    @ViewColumn()
    RelatedEntityBaseView: string;
      
    @Field({nullable: true}) 
    @MaxLength(202)
    @ViewColumn()
    RelatedEntityClassName?: string;
      
    @Field({nullable: true}) 
    @MaxLength(8000)
    @ViewColumn()
    RelatedEntityCodeName?: string;
      
    @Field({nullable: true}) 
    @MaxLength(202)
    @ViewColumn()
    RelatedEntityBaseTableCodeName?: string;
      
    @Field({nullable: true}) 
    @MaxLength(200)
    @ViewColumn()
    DisplayUserViewName?: string;
      
    @Field(() => Int, {nullable: true}) 
    @ViewColumn()
    DisplayUserViewID?: number;
    
}
        
//****************************************************************************
// INPUT TYPE for Entity Relationships   
//****************************************************************************
@InputType()
export class CreateEntityRelationshipInput {
    @Field(() => Int, )
    EntityID: number;

    @Field(() => Int, )
    RelatedEntityID: number;

    @Field(() => Boolean, )
    BundleInAPI: boolean;

    @Field(() => Boolean, )
    IncludeInParentAllQuery: boolean;

    @Field()
    Type: string;

    @Field({ nullable: true })
    EntityKeyField: string;

    @Field()
    RelatedEntityJoinField: string;

    @Field({ nullable: true })
    JoinView: string;

    @Field({ nullable: true })
    JoinEntityJoinField: string;

    @Field({ nullable: true })
    JoinEntityInverseJoinField: string;

    @Field(() => Boolean, )
    DisplayInForm: boolean;

    @Field({ nullable: true })
    DisplayName: string;
}

        
//****************************************************************************
// INPUT TYPE for Entity Relationships   
//****************************************************************************
@InputType()
export class UpdateEntityRelationshipInput {
    @Field(() => Int, )
    ID: number;

    @Field(() => Int, )
    EntityID: number;

    @Field(() => Int, )
    RelatedEntityID: number;

    @Field(() => Boolean, )
    BundleInAPI: boolean;

    @Field(() => Boolean, )
    IncludeInParentAllQuery: boolean;

    @Field()
    Type: string;

    @Field({ nullable: true })
    EntityKeyField: string;

    @Field()
    RelatedEntityJoinField: string;

    @Field({ nullable: true })
    JoinView: string;

    @Field({ nullable: true })
    JoinEntityJoinField: string;

    @Field({ nullable: true })
    JoinEntityInverseJoinField: string;

    @Field(() => Boolean, )
    DisplayInForm: boolean;

    @Field({ nullable: true })
    DisplayName: string;
}

//****************************************************************************
// RESOLVER for Entity Relationships
//****************************************************************************
@ObjectType()
export class RunEntityRelationshipViewResult {
    @Field(() => [EntityRelationship_])
    Results: EntityRelationship_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(EntityRelationship_)
export class EntityRelationshipResolver extends ResolverBase {
    @Query(() => RunEntityRelationshipViewResult)
    async RunEntityRelationshipViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunEntityRelationshipViewResult)
    async RunEntityRelationshipViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunEntityRelationshipViewResult)
    async RunEntityRelationshipDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Entity Relationships';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => EntityRelationship_, { nullable: true })
    async EntityRelationship(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<EntityRelationship_ | null> {
        this.CheckUserReadPermissions('Entity Relationships', userPayload);
        const sSQL = `SELECT * FROM vwEntityRelationships WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Entity Relationships', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }

    @Query(() => [EntityRelationship_])
    AllEntityRelationships(@Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Entity Relationships', userPayload);
        const sSQL = 'SELECT * FROM vwEntityRelationships' + this.getRowLevelSecurityWhereClause('Entity Relationships', userPayload, EntityPermissionType.Read, ' WHERE');
        return dataSource.query(sSQL);
    }

    @Mutation(() => EntityRelationship_)
    async CreateEntityRelationship(
        @Arg('input', () => CreateEntityRelationshipInput) input: CreateEntityRelationshipInput,
        @Ctx() { dataSource, userPayload }: AppContext, 
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeCreate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Entity Relationships', this.GetUserFromPayload(userPayload));
            await entityObject.NewRecord();
            entityObject.SetMany(input);
            if (await entityObject.Save()) {
                // save worked, fire the AfterCreate event and then return all the data
                await this.AfterCreate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else 
                // save failed, return null
                return null;
        }
        else    
            return null;
    }

    // Before/After CREATE Event Hooks for Sub-Classes to Override
    protected async BeforeCreate(dataSource: DataSource, input: CreateEntityRelationshipInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterCreate(dataSource: DataSource, input: CreateEntityRelationshipInput) {
        const i = input, d = dataSource; // prevent error
    }
    
    @Mutation(() => EntityRelationship_)
    async UpdateEntityRelationship(
        @Arg('input', () => UpdateEntityRelationshipInput) input: UpdateEntityRelationshipInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Entity Relationships', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for Entity Relationships
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateEntityRelationshipInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateEntityRelationshipInput) {
        const i = input, d = dataSource; // prevent error
    }

    @Mutation(() => Int)
    async DeleteEntityRelationship(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        if (await this.BeforeDelete(dataSource, ID)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Entity Relationships', this.GetUserFromPayload(userPayload));
            await entityObject.Load(ID)
            if (await entityObject.Delete()) {
                await this.AfterDelete(dataSource, ID); // fire event
                return ID;
            }
            else 
                return null; // delete failed
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeDelete(dataSource: DataSource, ID: number): Promise<boolean> {
        const i = ID, d = dataSource; // prevent error;
        return true;
    }
    protected async AfterDelete(dataSource: DataSource, ID: number) {
        const i = ID, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for User Record Logs
//****************************************************************************
@ViewEntity({
   name: 'vwUserRecordLogs',
   synchronize: false,
})
@ObjectType({ description: 'Tracks history of user access to records across the system, tracks reads and writes' })
export class UserRecordLog_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field(() => Int) 
    @Column()
    UserID: number;
      
    @Field(() => Int) 
    @Column()
    EntityID: number;
      
    @Field(() => Int) 
    @Column()
    RecordID: number;
      
    @Field() 
    @MaxLength(8)
    @Column()
    EarliestAt: Date;
      
    @Field() 
    @MaxLength(8)
    @Column()
    LatestAt: Date;
      
    @Field(() => Int) 
    @Column()
    TotalCount: number;
      
    @Field() 
    @MaxLength(100)
    @ViewColumn()
    Entity: string;
      
    @Field() 
    @MaxLength(200)
    @ViewColumn()
    UserName: string;
      
    @Field({nullable: true}) 
    @MaxLength(202)
    @ViewColumn()
    UserFirstLast?: string;
      
    @Field() 
    @MaxLength(200)
    @ViewColumn()
    UserEmail: string;
      
    @Field({nullable: true}) 
    @MaxLength(162)
    @ViewColumn()
    UserSupervisor?: string;
      
    @Field({nullable: true}) 
    @MaxLength(200)
    @ViewColumn()
    UserSupervisorEmail?: string;
    
}
        
//****************************************************************************
// INPUT TYPE for User Record Logs   
//****************************************************************************
@InputType()
export class UpdateUserRecordLogInput {
    @Field(() => Int, )
    ID: number;

    @Field(() => Int, )
    UserID: number;

    @Field(() => Int, )
    EntityID: number;

    @Field(() => Int, )
    RecordID: number;

    @Field()
    EarliestAt: Date;

    @Field()
    LatestAt: Date;

    @Field(() => Int, )
    TotalCount: number;
}

//****************************************************************************
// RESOLVER for User Record Logs
//****************************************************************************
@ObjectType()
export class RunUserRecordLogViewResult {
    @Field(() => [UserRecordLog_])
    Results: UserRecordLog_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(UserRecordLog_)
export class UserRecordLogResolver extends ResolverBase {
    @Query(() => RunUserRecordLogViewResult)
    async RunUserRecordLogViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunUserRecordLogViewResult)
    async RunUserRecordLogViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunUserRecordLogViewResult)
    async RunUserRecordLogDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'User Record Logs';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => UserRecordLog_, { nullable: true })
    async UserRecordLog(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<UserRecordLog_ | null> {
        this.CheckUserReadPermissions('User Record Logs', userPayload);
        const sSQL = `SELECT * FROM vwUserRecordLogs WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('User Record Logs', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }

    @Mutation(() => UserRecordLog_)
    async UpdateUserRecordLog(
        @Arg('input', () => UpdateUserRecordLogInput) input: UpdateUserRecordLogInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('User Record Logs', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for User Record Logs
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateUserRecordLogInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateUserRecordLogInput) {
        const i = input, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for User Views
//****************************************************************************
@ViewEntity({
   name: 'vwUserViews',
   synchronize: false,
})
@ObjectType({ description: 'User Views contain the metadata for the user viewing system of entity data' })
export class UserView_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field(() => Int) 
    @Column()
    UserID: number;
      
    @Field(() => Int) 
    @Column()
    EntityID: number;
      
    @Field() 
    @MaxLength(200)
    @Column()
    Name: string;
      
    @Field() 
    @MaxLength(16)
    @Column()
    GUID: string;
      
    @Field({nullable: true}) 
    @Column()
    Description?: string;
      
    @Field(() => Boolean) 
    @Column()
    IsShared: boolean;
      
    @Field(() => Boolean) 
    @Column()
    IsDefault: boolean;
      
    @Field({nullable: true}) 
    @Column()
    GridState?: string;
      
    @Field({nullable: true}) 
    @Column()
    FilterState?: string;
      
    @Field(() => Boolean) 
    @Column()
    CustomFilterState: boolean;
      
    @Field(() => Boolean) 
    @Column()
    SmartFilterEnabled: boolean;
      
    @Field({nullable: true}) 
    @Column()
    SmartFilterPrompt?: string;
      
    @Field({nullable: true}) 
    @Column()
    SmartFilterWhereClause?: string;
      
    @Field({nullable: true}) 
    @Column()
    SmartFilterExplanation?: string;
      
    @Field({nullable: true}) 
    @Column()
    WhereClause?: string;
      
    @Field(() => Boolean) 
    @Column()
    CustomWhereClause: boolean;
      
    @Field({nullable: true}) 
    @Column()
    SortState?: string;
      
    @Field({nullable: true}) 
    @MaxLength(8)
    @Column()
    CreatedAt?: Date;
      
    @Field({nullable: true}) 
    @MaxLength(8)
    @Column()
    UpdatedAt?: Date;
      
    @Field() 
    @MaxLength(200)
    @ViewColumn()
    UserName: string;
      
    @Field({nullable: true}) 
    @MaxLength(202)
    @ViewColumn()
    UserFirstLast?: string;
      
    @Field() 
    @MaxLength(200)
    @ViewColumn()
    UserEmail: string;
      
    @Field() 
    @MaxLength(30)
    @ViewColumn()
    UserType: string;
      
    @Field() 
    @MaxLength(100)
    @ViewColumn()
    Entity: string;
      
    @Field() 
    @MaxLength(100)
    @ViewColumn()
    EntityBaseView: string;
    
    @Field(() => [EntityRelationship_])
    @OneToMany(() => EntityRelationship_, () => null)
    EntityRelationships: EntityRelationship_[]; // Link to EntityRelationships

    @Field(() => [UserViewRun_])
    @OneToMany(() => UserViewRun_, () => null)
    UserViewRuns: UserViewRun_[]; // Link to UserViewRuns

}
        
//****************************************************************************
// INPUT TYPE for User Views   
//****************************************************************************
@InputType()
export class CreateUserViewInput {
    @Field(() => Int, )
    UserID: number;

    @Field(() => Int, )
    EntityID: number;

    @Field()
    Name: string;

    @Field({ nullable: true })
    Description: string;

    @Field(() => Boolean, )
    IsShared: boolean;

    @Field(() => Boolean, )
    IsDefault: boolean;

    @Field({ nullable: true })
    GridState: string;

    @Field({ nullable: true })
    FilterState: string;

    @Field(() => Boolean, )
    CustomFilterState: boolean;

    @Field(() => Boolean, )
    SmartFilterEnabled: boolean;

    @Field({ nullable: true })
    SmartFilterPrompt: string;

    @Field({ nullable: true })
    SmartFilterWhereClause: string;

    @Field({ nullable: true })
    SmartFilterExplanation: string;

    @Field({ nullable: true })
    WhereClause: string;

    @Field(() => Boolean, )
    CustomWhereClause: boolean;

    @Field({ nullable: true })
    SortState: string;
}

        
//****************************************************************************
// INPUT TYPE for User Views   
//****************************************************************************
@InputType()
export class UpdateUserViewInput {
    @Field(() => Int, )
    ID: number;

    @Field(() => Int, )
    UserID: number;

    @Field(() => Int, )
    EntityID: number;

    @Field()
    Name: string;

    @Field({ nullable: true })
    Description: string;

    @Field(() => Boolean, )
    IsShared: boolean;

    @Field(() => Boolean, )
    IsDefault: boolean;

    @Field({ nullable: true })
    GridState: string;

    @Field({ nullable: true })
    FilterState: string;

    @Field(() => Boolean, )
    CustomFilterState: boolean;

    @Field(() => Boolean, )
    SmartFilterEnabled: boolean;

    @Field({ nullable: true })
    SmartFilterPrompt: string;

    @Field({ nullable: true })
    SmartFilterWhereClause: string;

    @Field({ nullable: true })
    SmartFilterExplanation: string;

    @Field({ nullable: true })
    WhereClause: string;

    @Field(() => Boolean, )
    CustomWhereClause: boolean;

    @Field({ nullable: true })
    SortState: string;
}

//****************************************************************************
// RESOLVER for User Views
//****************************************************************************
@ObjectType()
export class RunUserViewViewResult {
    @Field(() => [UserView_])
    Results: UserView_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(UserView_)
export class UserViewResolverBase extends ResolverBase {
    @Query(() => RunUserViewViewResult)
    async RunUserViewViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunUserViewViewResult)
    async RunUserViewViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunUserViewViewResult)
    async RunUserViewDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'User Views';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => UserView_, { nullable: true })
    async UserView(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<UserView_ | null> {
        this.CheckUserReadPermissions('User Views', userPayload);
        const sSQL = `SELECT * FROM vwUserViews WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('User Views', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }

    @Query(() => [UserView_])
    AllUserViews(@Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('User Views', userPayload);
        const sSQL = 'SELECT * FROM vwUserViews' + this.getRowLevelSecurityWhereClause('User Views', userPayload, EntityPermissionType.Read, ' WHERE');
        return dataSource.query(sSQL);
    }
  
    @FieldResolver(() => [EntityRelationship_])
    async EntityRelationships(@Root() userview: UserView_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Entity Relationships', userPayload);
        const sSQL = `SELECT * FROM vwEntityRelationships WHERE DisplayUserViewGUID=${userview.ID} ` + this.getRowLevelSecurityWhereClause('Entity Relationships', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [UserViewRun_])
    async UserViewRuns(@Root() userview: UserView_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('User View Runs', userPayload);
        const sSQL = `SELECT * FROM vwUserViewRuns WHERE UserViewID=${userview.ID} ` + this.getRowLevelSecurityWhereClause('User View Runs', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
    
    @Mutation(() => UserView_)
    async CreateUserView(
        @Arg('input', () => CreateUserViewInput) input: CreateUserViewInput,
        @Ctx() { dataSource, userPayload }: AppContext, 
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeCreate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('User Views', this.GetUserFromPayload(userPayload));
            await entityObject.NewRecord();
            entityObject.SetMany(input);
            if (await entityObject.Save()) {
                // save worked, fire the AfterCreate event and then return all the data
                await this.AfterCreate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else 
                // save failed, return null
                return null;
        }
        else    
            return null;
    }

    // Before/After CREATE Event Hooks for Sub-Classes to Override
    protected async BeforeCreate(dataSource: DataSource, input: CreateUserViewInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterCreate(dataSource: DataSource, input: CreateUserViewInput) {
        const i = input, d = dataSource; // prevent error
    }
    
    @Mutation(() => UserView_)
    async UpdateUserView(
        @Arg('input', () => UpdateUserViewInput) input: UpdateUserViewInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('User Views', this.GetUserFromPayload(userPayload));
            await entityObject.Load(input.ID) // Track Changes is turned on, so we need to get the latest data from DB first before we save
            entityObject.SetMany(input);
            if (await entityObject.Save()) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateUserViewInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateUserViewInput) {
        const i = input, d = dataSource; // prevent error
    }

    @Mutation(() => Int)
    async DeleteUserView(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        if (await this.BeforeDelete(dataSource, ID)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('User Views', this.GetUserFromPayload(userPayload));
            await entityObject.Load(ID)
            if (await entityObject.Delete()) {
                await this.AfterDelete(dataSource, ID); // fire event
                return ID;
            }
            else 
                return null; // delete failed
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeDelete(dataSource: DataSource, ID: number): Promise<boolean> {
        const i = ID, d = dataSource; // prevent error;
        return true;
    }
    protected async AfterDelete(dataSource: DataSource, ID: number) {
        const i = ID, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for Company Integration Runs
//****************************************************************************
@ViewEntity({
   name: 'vwCompanyIntegrationRuns',
   synchronize: false,
})
@ObjectType({ description: 'Audit Trail for each run of a given company integration' })
export class CompanyIntegrationRun_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field(() => Int) 
    @Column()
    CompanyIntegrationID: number;
      
    @Field(() => Int) 
    @Column()
    RunByUserID: number;
      
    @Field({nullable: true}) 
    @MaxLength(8)
    @Column()
    StartedAt?: Date;
      
    @Field({nullable: true}) 
    @MaxLength(8)
    @Column()
    EndedAt?: Date;
      
    @Field(() => Int) 
    @Column()
    TotalRecords: number;
      
    @Field({nullable: true}) 
    @Column()
    Comments?: string;
      
    @Field() 
    @MaxLength(200)
    @ViewColumn()
    RunByUser: string;
    
    @Field(() => [CompanyIntegrationRunAPILog_])
    @OneToMany(() => CompanyIntegrationRunAPILog_, () => null)
    CompanyIntegrationRunAPILogs: CompanyIntegrationRunAPILog_[]; // Link to CompanyIntegrationRunAPILogs

    @Field(() => [ErrorLog_])
    @OneToMany(() => ErrorLog_, () => null)
    ErrorLogs: ErrorLog_[]; // Link to ErrorLogs

    @Field(() => [CompanyIntegrationRunDetail_])
    @OneToMany(() => CompanyIntegrationRunDetail_, () => null)
    CompanyIntegrationRunDetails: CompanyIntegrationRunDetail_[]; // Link to CompanyIntegrationRunDetails

}
        
//****************************************************************************
// INPUT TYPE for Company Integration Runs   
//****************************************************************************
@InputType()
export class UpdateCompanyIntegrationRunInput {
    @Field(() => Int, )
    ID: number;

    @Field(() => Int, )
    CompanyIntegrationID: number;

    @Field(() => Int, )
    RunByUserID: number;

    @Field({ nullable: true })
    StartedAt: Date;

    @Field({ nullable: true })
    EndedAt: Date;

    @Field(() => Int, )
    TotalRecords: number;

    @Field({ nullable: true })
    Comments: string;
}

//****************************************************************************
// RESOLVER for Company Integration Runs
//****************************************************************************
@ObjectType()
export class RunCompanyIntegrationRunViewResult {
    @Field(() => [CompanyIntegrationRun_])
    Results: CompanyIntegrationRun_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(CompanyIntegrationRun_)
export class CompanyIntegrationRunResolver extends ResolverBase {
    @Query(() => RunCompanyIntegrationRunViewResult)
    async RunCompanyIntegrationRunViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunCompanyIntegrationRunViewResult)
    async RunCompanyIntegrationRunViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunCompanyIntegrationRunViewResult)
    async RunCompanyIntegrationRunDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Company Integration Runs';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => CompanyIntegrationRun_, { nullable: true })
    async CompanyIntegrationRun(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<CompanyIntegrationRun_ | null> {
        this.CheckUserReadPermissions('Company Integration Runs', userPayload);
        const sSQL = `SELECT * FROM vwCompanyIntegrationRuns WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Company Integration Runs', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }
  
    @FieldResolver(() => [CompanyIntegrationRunAPILog_])
    async CompanyIntegrationRunAPILogs(@Root() companyintegrationrun: CompanyIntegrationRun_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Company Integration Run API Logs', userPayload);
        const sSQL = `SELECT * FROM vwCompanyIntegrationRunAPILogs WHERE CompanyIntegrationRunID=${companyintegrationrun.ID} ` + this.getRowLevelSecurityWhereClause('Company Integration Run API Logs', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [ErrorLog_])
    async ErrorLogs(@Root() companyintegrationrun: CompanyIntegrationRun_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Error Logs', userPayload);
        const sSQL = `SELECT * FROM vwErrorLogs WHERE CompanyIntegrationRunID=${companyintegrationrun.ID} ` + this.getRowLevelSecurityWhereClause('Error Logs', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [CompanyIntegrationRunDetail_])
    async CompanyIntegrationRunDetails(@Root() companyintegrationrun: CompanyIntegrationRun_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Company Integration Run Details', userPayload);
        const sSQL = `SELECT * FROM vwCompanyIntegrationRunDetails WHERE CompanyIntegrationRunID=${companyintegrationrun.ID} ` + this.getRowLevelSecurityWhereClause('Company Integration Run Details', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
    
    @Mutation(() => CompanyIntegrationRun_)
    async UpdateCompanyIntegrationRun(
        @Arg('input', () => UpdateCompanyIntegrationRunInput) input: UpdateCompanyIntegrationRunInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Company Integration Runs', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for Company Integration Runs
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateCompanyIntegrationRunInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateCompanyIntegrationRunInput) {
        const i = input, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for Company Integration Run Details
//****************************************************************************
@ViewEntity({
   name: 'vwCompanyIntegrationRunDetails',
   synchronize: false,
})
@ObjectType({ description: 'Record-level details for the audit trail for each integration run' })
export class CompanyIntegrationRunDetail_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field(() => Int) 
    @Column()
    CompanyIntegrationRunID: number;
      
    @Field(() => Int) 
    @Column()
    EntityID: number;
      
    @Field(() => Int) 
    @Column()
    RecordID: number;
      
    @Field() 
    @MaxLength(40)
    @Column()
    Action: string;
      
    @Field() 
    @MaxLength(8)
    @Column()
    ExecutedAt: Date;
      
    @Field(() => Boolean) 
    @Column()
    IsSuccess: boolean;
      
    @Field() 
    @MaxLength(100)
    @ViewColumn()
    Entity: string;
      
    @Field({nullable: true}) 
    @MaxLength(8)
    @ViewColumn()
    RunStartedAt?: Date;
      
    @Field({nullable: true}) 
    @MaxLength(8)
    @ViewColumn()
    RunEndedAt?: Date;
    
    @Field(() => [ErrorLog_])
    @OneToMany(() => ErrorLog_, () => null)
    ErrorLogs: ErrorLog_[]; // Link to ErrorLogs

}
        
//****************************************************************************
// INPUT TYPE for Company Integration Run Details   
//****************************************************************************
@InputType()
export class UpdateCompanyIntegrationRunDetailInput {
    @Field(() => Int, )
    ID: number;

    @Field(() => Int, )
    CompanyIntegrationRunID: number;

    @Field(() => Int, )
    EntityID: number;

    @Field(() => Int, )
    RecordID: number;

    @Field()
    Action: string;

    @Field()
    ExecutedAt: Date;

    @Field(() => Boolean, )
    IsSuccess: boolean;
}

//****************************************************************************
// RESOLVER for Company Integration Run Details
//****************************************************************************
@ObjectType()
export class RunCompanyIntegrationRunDetailViewResult {
    @Field(() => [CompanyIntegrationRunDetail_])
    Results: CompanyIntegrationRunDetail_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(CompanyIntegrationRunDetail_)
export class CompanyIntegrationRunDetailResolver extends ResolverBase {
    @Query(() => RunCompanyIntegrationRunDetailViewResult)
    async RunCompanyIntegrationRunDetailViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunCompanyIntegrationRunDetailViewResult)
    async RunCompanyIntegrationRunDetailViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunCompanyIntegrationRunDetailViewResult)
    async RunCompanyIntegrationRunDetailDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Company Integration Run Details';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => CompanyIntegrationRunDetail_, { nullable: true })
    async CompanyIntegrationRunDetail(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<CompanyIntegrationRunDetail_ | null> {
        this.CheckUserReadPermissions('Company Integration Run Details', userPayload);
        const sSQL = `SELECT * FROM vwCompanyIntegrationRunDetails WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Company Integration Run Details', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }
  
    @FieldResolver(() => [ErrorLog_])
    async ErrorLogs(@Root() companyintegrationrundetail: CompanyIntegrationRunDetail_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Error Logs', userPayload);
        const sSQL = `SELECT * FROM vwErrorLogs WHERE CompanyIntegrationRunDetailID=${companyintegrationrundetail.ID} ` + this.getRowLevelSecurityWhereClause('Error Logs', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
    
    @Mutation(() => CompanyIntegrationRunDetail_)
    async UpdateCompanyIntegrationRunDetail(
        @Arg('input', () => UpdateCompanyIntegrationRunDetailInput) input: UpdateCompanyIntegrationRunDetailInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Company Integration Run Details', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for Company Integration Run Details
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateCompanyIntegrationRunDetailInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateCompanyIntegrationRunDetailInput) {
        const i = input, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for Error Logs
//****************************************************************************
@ViewEntity({
   name: 'vwErrorLogs',
   synchronize: false,
})
@ObjectType()
export class ErrorLog_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field(() => Int, {nullable: true}) 
    @Column()
    CompanyIntegrationRunID?: number;
      
    @Field(() => Int, {nullable: true}) 
    @Column()
    CompanyIntegrationRunDetailID?: number;
      
    @Field({nullable: true}) 
    @MaxLength(40)
    @Column()
    Code?: string;
      
    @Field({nullable: true}) 
    @Column()
    Message?: string;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
      
    @Field({nullable: true}) 
    @MaxLength(100)
    @Column()
    CreatedBy?: string;
      
    @Field({nullable: true}) 
    @MaxLength(20)
    @Column()
    Status?: string;
      
    @Field({nullable: true}) 
    @MaxLength(40)
    @Column()
    Category?: string;
      
    @Field({nullable: true}) 
    @Column()
    Details?: string;
    
}
        
//****************************************************************************
// INPUT TYPE for Error Logs   
//****************************************************************************
@InputType()
export class UpdateErrorLogInput {
    @Field(() => Int, )
    ID: number;

    @Field(() => Int, { nullable: true })
    CompanyIntegrationRunID: number;

    @Field(() => Int, { nullable: true })
    CompanyIntegrationRunDetailID: number;

    @Field({ nullable: true })
    Code: string;

    @Field({ nullable: true })
    Message: string;

    @Field({ nullable: true })
    CreatedBy: string;

    @Field({ nullable: true })
    Status: string;

    @Field({ nullable: true })
    Category: string;

    @Field({ nullable: true })
    Details: string;
}

//****************************************************************************
// RESOLVER for Error Logs
//****************************************************************************
@ObjectType()
export class RunErrorLogViewResult {
    @Field(() => [ErrorLog_])
    Results: ErrorLog_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(ErrorLog_)
export class ErrorLogResolver extends ResolverBase {
    @Query(() => RunErrorLogViewResult)
    async RunErrorLogViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunErrorLogViewResult)
    async RunErrorLogViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunErrorLogViewResult)
    async RunErrorLogDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Error Logs';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => ErrorLog_, { nullable: true })
    async ErrorLog(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<ErrorLog_ | null> {
        this.CheckUserReadPermissions('Error Logs', userPayload);
        const sSQL = `SELECT * FROM vwErrorLogs WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Error Logs', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }

    @Mutation(() => ErrorLog_)
    async UpdateErrorLog(
        @Arg('input', () => UpdateErrorLogInput) input: UpdateErrorLogInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Error Logs', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for Error Logs
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateErrorLogInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateErrorLogInput) {
        const i = input, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for Applications
//****************************************************************************
@ViewEntity({
   name: 'vwApplications',
   synchronize: false,
})
@ObjectType()
export class Application_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field() 
    @MaxLength(100)
    @Column()
    Name: string;
      
    @Field({nullable: true}) 
    @MaxLength(1000)
    @Column()
    Description?: string;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
      
    @Field() 
    @MaxLength(8)
    @Column()
    UpdatedAt: Date;
    
    @Field(() => [ApplicationEntity_])
    @OneToMany(() => ApplicationEntity_, () => null)
    ApplicationEntities: ApplicationEntity_[]; // Link to ApplicationEntities

    @Field(() => [UserApplication_])
    @OneToMany(() => UserApplication_, () => null)
    UserApplications: UserApplication_[]; // Link to UserApplications

}
        
//****************************************************************************
// INPUT TYPE for Applications   
//****************************************************************************
@InputType()
export class UpdateApplicationInput {
    @Field(() => Int, )
    ID: number;

    @Field()
    Name: string;

    @Field({ nullable: true })
    Description: string;
}

//****************************************************************************
// RESOLVER for Applications
//****************************************************************************
@ObjectType()
export class RunApplicationViewResult {
    @Field(() => [Application_])
    Results: Application_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(Application_)
export class ApplicationResolver extends ResolverBase {
    @Query(() => RunApplicationViewResult)
    async RunApplicationViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunApplicationViewResult)
    async RunApplicationViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunApplicationViewResult)
    async RunApplicationDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Applications';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => Application_, { nullable: true })
    async Application(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<Application_ | null> {
        this.CheckUserReadPermissions('Applications', userPayload);
        const sSQL = `SELECT * FROM vwApplications WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Applications', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }

    @Query(() => [Application_])
    AllApplications(@Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Applications', userPayload);
        const sSQL = 'SELECT * FROM vwApplications' + this.getRowLevelSecurityWhereClause('Applications', userPayload, EntityPermissionType.Read, ' WHERE');
        return dataSource.query(sSQL);
    }
  
    @FieldResolver(() => [ApplicationEntity_])
    async ApplicationEntities(@Root() application: Application_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Application Entities', userPayload);
        const sSQL = `SELECT * FROM vwApplicationEntities WHERE ApplicationID=${application.ID} ` + this.getRowLevelSecurityWhereClause('Application Entities', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [UserApplication_])
    async UserApplications(@Root() application: Application_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('User Applications', userPayload);
        const sSQL = `SELECT * FROM vwUserApplications WHERE ApplicationID=${application.ID} ` + this.getRowLevelSecurityWhereClause('User Applications', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
    
    @Mutation(() => Application_)
    async UpdateApplication(
        @Arg('input', () => UpdateApplicationInput) input: UpdateApplicationInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Applications', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for Applications
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateApplicationInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateApplicationInput) {
        const i = input, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for Application Entities
//****************************************************************************
@ViewEntity({
   name: 'vwApplicationEntities',
   synchronize: false,
})
@ObjectType()
export class ApplicationEntity_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field({nullable: true}) 
    @MaxLength(100)
    @Column()
    ApplicationName?: string;
      
    @Field(() => Int) 
    @Column()
    EntityID: number;
      
    @Field(() => Int) 
    @Column()
    Sequence: number;
      
    @Field(() => Boolean) 
    @Column()
    DefaultForNewUser: boolean;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
      
    @Field() 
    @MaxLength(8)
    @Column()
    UpdatedAt: Date;
      
    @Field() 
    @MaxLength(100)
    @ViewColumn()
    Application: string;
      
    @Field() 
    @MaxLength(100)
    @ViewColumn()
    Entity: string;
      
    @Field() 
    @MaxLength(100)
    @ViewColumn()
    EntityBaseTable: string;
      
    @Field({nullable: true}) 
    @MaxLength(8000)
    @ViewColumn()
    EntityCodeName?: string;
      
    @Field({nullable: true}) 
    @MaxLength(202)
    @ViewColumn()
    EntityClassName?: string;
      
    @Field({nullable: true}) 
    @MaxLength(202)
    @ViewColumn()
    EntityBaseTableCodeName?: string;
    
}
        
//****************************************************************************
// INPUT TYPE for Application Entities   
//****************************************************************************
@InputType()
export class CreateApplicationEntityInput {
    @Field(() => Int, )
    ID: number;

    @Field({ nullable: true })
    ApplicationName: string;

    @Field(() => Int, )
    EntityID: number;

    @Field(() => Int, )
    Sequence: number;

    @Field(() => Boolean, )
    DefaultForNewUser: boolean;
}

        
//****************************************************************************
// INPUT TYPE for Application Entities   
//****************************************************************************
@InputType()
export class UpdateApplicationEntityInput {
    @Field(() => Int, )
    ID: number;

    @Field({ nullable: true })
    ApplicationName: string;

    @Field(() => Int, )
    EntityID: number;

    @Field(() => Int, )
    Sequence: number;

    @Field(() => Boolean, )
    DefaultForNewUser: boolean;
}

//****************************************************************************
// RESOLVER for Application Entities
//****************************************************************************
@ObjectType()
export class RunApplicationEntityViewResult {
    @Field(() => [ApplicationEntity_])
    Results: ApplicationEntity_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(ApplicationEntity_)
export class ApplicationEntityResolver extends ResolverBase {
    @Query(() => RunApplicationEntityViewResult)
    async RunApplicationEntityViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunApplicationEntityViewResult)
    async RunApplicationEntityViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunApplicationEntityViewResult)
    async RunApplicationEntityDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Application Entities';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => ApplicationEntity_, { nullable: true })
    async ApplicationEntity(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<ApplicationEntity_ | null> {
        this.CheckUserReadPermissions('Application Entities', userPayload);
        const sSQL = `SELECT * FROM vwApplicationEntities WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Application Entities', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }

    @Mutation(() => ApplicationEntity_)
    async CreateApplicationEntity(
        @Arg('input', () => CreateApplicationEntityInput) input: CreateApplicationEntityInput,
        @Ctx() { dataSource, userPayload }: AppContext, 
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeCreate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Application Entities', this.GetUserFromPayload(userPayload));
            await entityObject.NewRecord();
            entityObject.SetMany(input);
            if (await entityObject.Save()) {
                // save worked, fire the AfterCreate event and then return all the data
                await this.AfterCreate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else 
                // save failed, return null
                return null;
        }
        else    
            return null;
    }

    // Before/After CREATE Event Hooks for Sub-Classes to Override
    protected async BeforeCreate(dataSource: DataSource, input: CreateApplicationEntityInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterCreate(dataSource: DataSource, input: CreateApplicationEntityInput) {
        const i = input, d = dataSource; // prevent error
    }
    
    @Mutation(() => ApplicationEntity_)
    async UpdateApplicationEntity(
        @Arg('input', () => UpdateApplicationEntityInput) input: UpdateApplicationEntityInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Application Entities', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for Application Entities
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateApplicationEntityInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateApplicationEntityInput) {
        const i = input, d = dataSource; // prevent error
    }

    @Mutation(() => Int)
    async DeleteApplicationEntity(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        if (await this.BeforeDelete(dataSource, ID)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Application Entities', this.GetUserFromPayload(userPayload));
            await entityObject.Load(ID)
            if (await entityObject.Delete()) {
                await this.AfterDelete(dataSource, ID); // fire event
                return ID;
            }
            else 
                return null; // delete failed
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeDelete(dataSource: DataSource, ID: number): Promise<boolean> {
        const i = ID, d = dataSource; // prevent error;
        return true;
    }
    protected async AfterDelete(dataSource: DataSource, ID: number) {
        const i = ID, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for Entity Permissions
//****************************************************************************
@ViewEntity({
   name: 'vwEntityPermissions',
   synchronize: false,
})
@ObjectType()
export class EntityPermission_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field(() => Int) 
    @Column()
    EntityID: number;
      
    @Field({nullable: true}) 
    @MaxLength(100)
    @Column()
    RoleName?: string;
      
    @Field(() => Boolean) 
    @Column()
    CanCreate: boolean;
      
    @Field(() => Boolean) 
    @Column()
    CanRead: boolean;
      
    @Field(() => Boolean) 
    @Column()
    CanUpdate: boolean;
      
    @Field(() => Boolean) 
    @Column()
    CanDelete: boolean;
      
    @Field(() => Int, {nullable: true}) 
    @Column()
    ReadRLSFilterID?: number;
      
    @Field(() => Int, {nullable: true}) 
    @Column()
    CreateRLSFilterID?: number;
      
    @Field(() => Int, {nullable: true}) 
    @Column()
    UpdateRLSFilterID?: number;
      
    @Field(() => Int, {nullable: true}) 
    @Column()
    DeleteRLSFilterID?: number;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
      
    @Field() 
    @MaxLength(8)
    @Column()
    UpdatedAt: Date;
      
    @Field() 
    @MaxLength(100)
    @ViewColumn()
    Entity: string;
      
    @Field() 
    @MaxLength(100)
    @ViewColumn()
    RoleSQLName: string;
      
    @Field({nullable: true}) 
    @MaxLength(200)
    @ViewColumn()
    CreateRLSFilter?: string;
      
    @Field({nullable: true}) 
    @MaxLength(200)
    @ViewColumn()
    ReadRLSFilter?: string;
      
    @Field({nullable: true}) 
    @MaxLength(200)
    @ViewColumn()
    UpdateRLSFilter?: string;
      
    @Field({nullable: true}) 
    @MaxLength(200)
    @ViewColumn()
    DeleteRLSFilter?: string;
    
}
        
//****************************************************************************
// INPUT TYPE for Entity Permissions   
//****************************************************************************
@InputType()
export class CreateEntityPermissionInput {
    @Field(() => Int, )
    ID: number;

    @Field(() => Int, )
    EntityID: number;

    @Field({ nullable: true })
    RoleName: string;

    @Field(() => Boolean, )
    CanCreate: boolean;

    @Field(() => Boolean, )
    CanRead: boolean;

    @Field(() => Boolean, )
    CanUpdate: boolean;

    @Field(() => Boolean, )
    CanDelete: boolean;

    @Field(() => Int, { nullable: true })
    ReadRLSFilterID: number;

    @Field(() => Int, { nullable: true })
    CreateRLSFilterID: number;

    @Field(() => Int, { nullable: true })
    UpdateRLSFilterID: number;

    @Field(() => Int, { nullable: true })
    DeleteRLSFilterID: number;
}

        
//****************************************************************************
// INPUT TYPE for Entity Permissions   
//****************************************************************************
@InputType()
export class UpdateEntityPermissionInput {
    @Field(() => Int, )
    ID: number;

    @Field(() => Int, )
    EntityID: number;

    @Field({ nullable: true })
    RoleName: string;

    @Field(() => Boolean, )
    CanCreate: boolean;

    @Field(() => Boolean, )
    CanRead: boolean;

    @Field(() => Boolean, )
    CanUpdate: boolean;

    @Field(() => Boolean, )
    CanDelete: boolean;

    @Field(() => Int, { nullable: true })
    ReadRLSFilterID: number;

    @Field(() => Int, { nullable: true })
    CreateRLSFilterID: number;

    @Field(() => Int, { nullable: true })
    UpdateRLSFilterID: number;

    @Field(() => Int, { nullable: true })
    DeleteRLSFilterID: number;
}

//****************************************************************************
// RESOLVER for Entity Permissions
//****************************************************************************
@ObjectType()
export class RunEntityPermissionViewResult {
    @Field(() => [EntityPermission_])
    Results: EntityPermission_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(EntityPermission_)
export class EntityPermissionResolver extends ResolverBase {
    @Query(() => RunEntityPermissionViewResult)
    async RunEntityPermissionViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunEntityPermissionViewResult)
    async RunEntityPermissionViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunEntityPermissionViewResult)
    async RunEntityPermissionDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Entity Permissions';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => EntityPermission_, { nullable: true })
    async EntityPermission(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<EntityPermission_ | null> {
        this.CheckUserReadPermissions('Entity Permissions', userPayload);
        const sSQL = `SELECT * FROM vwEntityPermissions WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Entity Permissions', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }

    @Query(() => [EntityPermission_])
    AllEntityPermissions(@Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Entity Permissions', userPayload);
        const sSQL = 'SELECT * FROM vwEntityPermissions' + this.getRowLevelSecurityWhereClause('Entity Permissions', userPayload, EntityPermissionType.Read, ' WHERE');
        return dataSource.query(sSQL);
    }

    @Mutation(() => EntityPermission_)
    async CreateEntityPermission(
        @Arg('input', () => CreateEntityPermissionInput) input: CreateEntityPermissionInput,
        @Ctx() { dataSource, userPayload }: AppContext, 
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeCreate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Entity Permissions', this.GetUserFromPayload(userPayload));
            await entityObject.NewRecord();
            entityObject.SetMany(input);
            if (await entityObject.Save()) {
                // save worked, fire the AfterCreate event and then return all the data
                await this.AfterCreate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else 
                // save failed, return null
                return null;
        }
        else    
            return null;
    }

    // Before/After CREATE Event Hooks for Sub-Classes to Override
    protected async BeforeCreate(dataSource: DataSource, input: CreateEntityPermissionInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterCreate(dataSource: DataSource, input: CreateEntityPermissionInput) {
        const i = input, d = dataSource; // prevent error
    }
    
    @Mutation(() => EntityPermission_)
    async UpdateEntityPermission(
        @Arg('input', () => UpdateEntityPermissionInput) input: UpdateEntityPermissionInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Entity Permissions', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for Entity Permissions
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateEntityPermissionInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateEntityPermissionInput) {
        const i = input, d = dataSource; // prevent error
    }

    @Mutation(() => Int)
    async DeleteEntityPermission(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        if (await this.BeforeDelete(dataSource, ID)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Entity Permissions', this.GetUserFromPayload(userPayload));
            await entityObject.Load(ID)
            if (await entityObject.Delete()) {
                await this.AfterDelete(dataSource, ID); // fire event
                return ID;
            }
            else 
                return null; // delete failed
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeDelete(dataSource: DataSource, ID: number): Promise<boolean> {
        const i = ID, d = dataSource; // prevent error;
        return true;
    }
    protected async AfterDelete(dataSource: DataSource, ID: number) {
        const i = ID, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for User Application Entities
//****************************************************************************
@ViewEntity({
   name: 'vwUserApplicationEntities',
   synchronize: false,
})
@ObjectType()
export class UserApplicationEntity_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field(() => Int) 
    @Column()
    UserApplicationID: number;
      
    @Field(() => Int) 
    @Column()
    EntityID: number;
      
    @Field(() => Int) 
    @Column()
    Sequence: number;
      
    @Field() 
    @MaxLength(100)
    @ViewColumn()
    Application: string;
      
    @Field() 
    @MaxLength(200)
    @ViewColumn()
    User: string;
      
    @Field() 
    @MaxLength(100)
    @ViewColumn()
    Entity: string;
    
}
        
//****************************************************************************
// INPUT TYPE for User Application Entities   
//****************************************************************************
@InputType()
export class CreateUserApplicationEntityInput {
    @Field(() => Int, )
    ID: number;

    @Field(() => Int, )
    UserApplicationID: number;

    @Field(() => Int, )
    EntityID: number;

    @Field(() => Int, )
    Sequence: number;
}

        
//****************************************************************************
// INPUT TYPE for User Application Entities   
//****************************************************************************
@InputType()
export class UpdateUserApplicationEntityInput {
    @Field(() => Int, )
    ID: number;

    @Field(() => Int, )
    UserApplicationID: number;

    @Field(() => Int, )
    EntityID: number;

    @Field(() => Int, )
    Sequence: number;
}

//****************************************************************************
// RESOLVER for User Application Entities
//****************************************************************************
@ObjectType()
export class RunUserApplicationEntityViewResult {
    @Field(() => [UserApplicationEntity_])
    Results: UserApplicationEntity_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(UserApplicationEntity_)
export class UserApplicationEntityResolver extends ResolverBase {
    @Query(() => RunUserApplicationEntityViewResult)
    async RunUserApplicationEntityViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunUserApplicationEntityViewResult)
    async RunUserApplicationEntityViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunUserApplicationEntityViewResult)
    async RunUserApplicationEntityDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'User Application Entities';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => UserApplicationEntity_, { nullable: true })
    async UserApplicationEntity(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<UserApplicationEntity_ | null> {
        this.CheckUserReadPermissions('User Application Entities', userPayload);
        const sSQL = `SELECT * FROM vwUserApplicationEntities WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('User Application Entities', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }

    @Mutation(() => UserApplicationEntity_)
    async CreateUserApplicationEntity(
        @Arg('input', () => CreateUserApplicationEntityInput) input: CreateUserApplicationEntityInput,
        @Ctx() { dataSource, userPayload }: AppContext, 
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeCreate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('User Application Entities', this.GetUserFromPayload(userPayload));
            await entityObject.NewRecord();
            entityObject.SetMany(input);
            if (await entityObject.Save()) {
                // save worked, fire the AfterCreate event and then return all the data
                await this.AfterCreate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else 
                // save failed, return null
                return null;
        }
        else    
            return null;
    }

    // Before/After CREATE Event Hooks for Sub-Classes to Override
    protected async BeforeCreate(dataSource: DataSource, input: CreateUserApplicationEntityInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterCreate(dataSource: DataSource, input: CreateUserApplicationEntityInput) {
        const i = input, d = dataSource; // prevent error
    }
    
    @Mutation(() => UserApplicationEntity_)
    async UpdateUserApplicationEntity(
        @Arg('input', () => UpdateUserApplicationEntityInput) input: UpdateUserApplicationEntityInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('User Application Entities', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for User Application Entities
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateUserApplicationEntityInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateUserApplicationEntityInput) {
        const i = input, d = dataSource; // prevent error
    }

    @Mutation(() => Int)
    async DeleteUserApplicationEntity(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        if (await this.BeforeDelete(dataSource, ID)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('User Application Entities', this.GetUserFromPayload(userPayload));
            await entityObject.Load(ID)
            if (await entityObject.Delete()) {
                await this.AfterDelete(dataSource, ID); // fire event
                return ID;
            }
            else 
                return null; // delete failed
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeDelete(dataSource: DataSource, ID: number): Promise<boolean> {
        const i = ID, d = dataSource; // prevent error;
        return true;
    }
    protected async AfterDelete(dataSource: DataSource, ID: number) {
        const i = ID, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for User Applications
//****************************************************************************
@ViewEntity({
   name: 'vwUserApplications',
   synchronize: false,
})
@ObjectType()
export class UserApplication_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field(() => Int) 
    @Column()
    UserID: number;
      
    @Field(() => Int) 
    @Column()
    ApplicationID: number;
      
    @Field(() => Int) 
    @Column()
    Sequence: number;
      
    @Field(() => Boolean) 
    @Column()
    IsActive: boolean;
      
    @Field() 
    @MaxLength(200)
    @ViewColumn()
    User: string;
      
    @Field() 
    @MaxLength(100)
    @ViewColumn()
    Application: string;
    
    @Field(() => [UserApplicationEntity_])
    @OneToMany(() => UserApplicationEntity_, () => null)
    UserApplicationEntities: UserApplicationEntity_[]; // Link to UserApplicationEntities

}
        
//****************************************************************************
// INPUT TYPE for User Applications   
//****************************************************************************
@InputType()
export class UpdateUserApplicationInput {
    @Field(() => Int, )
    ID: number;

    @Field(() => Int, )
    UserID: number;

    @Field(() => Int, )
    ApplicationID: number;

    @Field(() => Int, )
    Sequence: number;

    @Field(() => Boolean, )
    IsActive: boolean;
}

//****************************************************************************
// RESOLVER for User Applications
//****************************************************************************
@ObjectType()
export class RunUserApplicationViewResult {
    @Field(() => [UserApplication_])
    Results: UserApplication_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(UserApplication_)
export class UserApplicationResolver extends ResolverBase {
    @Query(() => RunUserApplicationViewResult)
    async RunUserApplicationViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunUserApplicationViewResult)
    async RunUserApplicationViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunUserApplicationViewResult)
    async RunUserApplicationDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'User Applications';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => UserApplication_, { nullable: true })
    async UserApplication(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<UserApplication_ | null> {
        this.CheckUserReadPermissions('User Applications', userPayload);
        const sSQL = `SELECT * FROM vwUserApplications WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('User Applications', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }
  
    @FieldResolver(() => [UserApplicationEntity_])
    async UserApplicationEntities(@Root() userapplication: UserApplication_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('User Application Entities', userPayload);
        const sSQL = `SELECT * FROM vwUserApplicationEntities WHERE UserApplicationID=${userapplication.ID} ` + this.getRowLevelSecurityWhereClause('User Application Entities', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
    
    @Mutation(() => UserApplication_)
    async UpdateUserApplication(
        @Arg('input', () => UpdateUserApplicationInput) input: UpdateUserApplicationInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('User Applications', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for User Applications
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateUserApplicationInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateUserApplicationInput) {
        const i = input, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for Company Integration Run API Logs
//****************************************************************************
@ViewEntity({
   name: 'vwCompanyIntegrationRunAPILogs',
   synchronize: false,
})
@ObjectType()
export class CompanyIntegrationRunAPILog_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field(() => Int) 
    @Column()
    CompanyIntegrationRunID: number;
      
    @Field() 
    @MaxLength(8)
    @Column()
    ExecutedAt: Date;
      
    @Field(() => Boolean) 
    @Column()
    IsSuccess: boolean;
      
    @Field({nullable: true}) 
    @MaxLength(24)
    @Column()
    RequestMethod?: string;
      
    @Field({nullable: true}) 
    @Column()
    URL?: string;
      
    @Field({nullable: true}) 
    @Column()
    Parameters?: string;
    
}
        
//****************************************************************************
// INPUT TYPE for Company Integration Run API Logs   
//****************************************************************************
@InputType()
export class UpdateCompanyIntegrationRunAPILogInput {
    @Field(() => Int, )
    ID: number;

    @Field(() => Int, )
    CompanyIntegrationRunID: number;

    @Field()
    ExecutedAt: Date;

    @Field(() => Boolean, )
    IsSuccess: boolean;

    @Field({ nullable: true })
    RequestMethod: string;

    @Field({ nullable: true })
    URL: string;

    @Field({ nullable: true })
    Parameters: string;
}

//****************************************************************************
// RESOLVER for Company Integration Run API Logs
//****************************************************************************
@ObjectType()
export class RunCompanyIntegrationRunAPILogViewResult {
    @Field(() => [CompanyIntegrationRunAPILog_])
    Results: CompanyIntegrationRunAPILog_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(CompanyIntegrationRunAPILog_)
export class CompanyIntegrationRunAPILogResolver extends ResolverBase {
    @Query(() => RunCompanyIntegrationRunAPILogViewResult)
    async RunCompanyIntegrationRunAPILogViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunCompanyIntegrationRunAPILogViewResult)
    async RunCompanyIntegrationRunAPILogViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunCompanyIntegrationRunAPILogViewResult)
    async RunCompanyIntegrationRunAPILogDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Company Integration Run API Logs';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => CompanyIntegrationRunAPILog_, { nullable: true })
    async CompanyIntegrationRunAPILog(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<CompanyIntegrationRunAPILog_ | null> {
        this.CheckUserReadPermissions('Company Integration Run API Logs', userPayload);
        const sSQL = `SELECT * FROM vwCompanyIntegrationRunAPILogs WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Company Integration Run API Logs', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }

    @Mutation(() => CompanyIntegrationRunAPILog_)
    async UpdateCompanyIntegrationRunAPILog(
        @Arg('input', () => UpdateCompanyIntegrationRunAPILogInput) input: UpdateCompanyIntegrationRunAPILogInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Company Integration Run API Logs', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for Company Integration Run API Logs
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateCompanyIntegrationRunAPILogInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateCompanyIntegrationRunAPILogInput) {
        const i = input, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for Lists
//****************************************************************************
@ViewEntity({
   name: 'vwLists',
   synchronize: false,
})
@ObjectType()
export class List_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field() 
    @MaxLength(200)
    @Column()
    Name: string;
      
    @Field({nullable: true}) 
    @Column()
    Description?: string;
      
    @Field(() => Int, {nullable: true}) 
    @Column()
    EntityID?: number;
      
    @Field(() => Int) 
    @Column()
    UserID: number;
      
    @Field({nullable: true}) 
    @MaxLength(200)
    @Column()
    ExternalSystemRecordID?: string;
      
    @Field(() => Int, {nullable: true}) 
    @Column()
    CompanyIntegrationID?: number;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
      
    @Field() 
    @MaxLength(8)
    @Column()
    UpdatedAt: Date;
      
    @Field({nullable: true}) 
    @MaxLength(100)
    @ViewColumn()
    Entity?: string;
      
    @Field() 
    @MaxLength(200)
    @ViewColumn()
    User: string;
    
    @Field(() => [ListDetail_])
    @OneToMany(() => ListDetail_, () => null)
    ListDetails: ListDetail_[]; // Link to ListDetails

}
        
//****************************************************************************
// INPUT TYPE for Lists   
//****************************************************************************
@InputType()
export class CreateListInput {
    @Field(() => Int, )
    ID: number;

    @Field()
    Name: string;

    @Field({ nullable: true })
    Description: string;

    @Field(() => Int, { nullable: true })
    EntityID: number;

    @Field(() => Int, )
    UserID: number;

    @Field({ nullable: true })
    ExternalSystemRecordID: string;

    @Field(() => Int, { nullable: true })
    CompanyIntegrationID: number;
}

        
//****************************************************************************
// INPUT TYPE for Lists   
//****************************************************************************
@InputType()
export class UpdateListInput {
    @Field(() => Int, )
    ID: number;

    @Field()
    Name: string;

    @Field({ nullable: true })
    Description: string;

    @Field(() => Int, { nullable: true })
    EntityID: number;

    @Field(() => Int, )
    UserID: number;

    @Field({ nullable: true })
    ExternalSystemRecordID: string;

    @Field(() => Int, { nullable: true })
    CompanyIntegrationID: number;
}

//****************************************************************************
// RESOLVER for Lists
//****************************************************************************
@ObjectType()
export class RunListViewResult {
    @Field(() => [List_])
    Results: List_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(List_)
export class ListResolver extends ResolverBase {
    @Query(() => RunListViewResult)
    async RunListViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunListViewResult)
    async RunListViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunListViewResult)
    async RunListDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Lists';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => List_, { nullable: true })
    async List(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<List_ | null> {
        this.CheckUserReadPermissions('Lists', userPayload);
        const sSQL = `SELECT * FROM vwLists WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Lists', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }
  
    @FieldResolver(() => [ListDetail_])
    async ListDetails(@Root() list: List_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('List Details', userPayload);
        const sSQL = `SELECT * FROM vwListDetails WHERE ListID=${list.ID} ` + this.getRowLevelSecurityWhereClause('List Details', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
    
    @Mutation(() => List_)
    async CreateList(
        @Arg('input', () => CreateListInput) input: CreateListInput,
        @Ctx() { dataSource, userPayload }: AppContext, 
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeCreate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Lists', this.GetUserFromPayload(userPayload));
            await entityObject.NewRecord();
            entityObject.SetMany(input);
            if (await entityObject.Save()) {
                // save worked, fire the AfterCreate event and then return all the data
                await this.AfterCreate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else 
                // save failed, return null
                return null;
        }
        else    
            return null;
    }

    // Before/After CREATE Event Hooks for Sub-Classes to Override
    protected async BeforeCreate(dataSource: DataSource, input: CreateListInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterCreate(dataSource: DataSource, input: CreateListInput) {
        const i = input, d = dataSource; // prevent error
    }
    
    @Mutation(() => List_)
    async UpdateList(
        @Arg('input', () => UpdateListInput) input: UpdateListInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Lists', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for Lists
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateListInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateListInput) {
        const i = input, d = dataSource; // prevent error
    }

    @Mutation(() => Int)
    async DeleteList(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        if (await this.BeforeDelete(dataSource, ID)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Lists', this.GetUserFromPayload(userPayload));
            await entityObject.Load(ID)
            if (await entityObject.Delete()) {
                await this.AfterDelete(dataSource, ID); // fire event
                return ID;
            }
            else 
                return null; // delete failed
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeDelete(dataSource: DataSource, ID: number): Promise<boolean> {
        const i = ID, d = dataSource; // prevent error;
        return true;
    }
    protected async AfterDelete(dataSource: DataSource, ID: number) {
        const i = ID, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for List Details
//****************************************************************************
@ViewEntity({
   name: 'vwListDetails',
   synchronize: false,
})
@ObjectType()
export class ListDetail_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field(() => Int) 
    @Column()
    ListID: number;
      
    @Field(() => Int) 
    @Column()
    RecordID: number;
      
    @Field(() => Int) 
    @Column()
    Sequence: number;
    
}
        
//****************************************************************************
// INPUT TYPE for List Details   
//****************************************************************************
@InputType()
export class CreateListDetailInput {
    @Field(() => Int, )
    ID: number;

    @Field(() => Int, )
    ListID: number;

    @Field(() => Int, )
    RecordID: number;

    @Field(() => Int, )
    Sequence: number;
}

        
//****************************************************************************
// INPUT TYPE for List Details   
//****************************************************************************
@InputType()
export class UpdateListDetailInput {
    @Field(() => Int, )
    ID: number;

    @Field(() => Int, )
    ListID: number;

    @Field(() => Int, )
    RecordID: number;

    @Field(() => Int, )
    Sequence: number;
}

//****************************************************************************
// RESOLVER for List Details
//****************************************************************************
@ObjectType()
export class RunListDetailViewResult {
    @Field(() => [ListDetail_])
    Results: ListDetail_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(ListDetail_)
export class ListDetailResolver extends ResolverBase {
    @Query(() => RunListDetailViewResult)
    async RunListDetailViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunListDetailViewResult)
    async RunListDetailViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunListDetailViewResult)
    async RunListDetailDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'List Details';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => ListDetail_, { nullable: true })
    async ListDetail(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<ListDetail_ | null> {
        this.CheckUserReadPermissions('List Details', userPayload);
        const sSQL = `SELECT * FROM vwListDetails WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('List Details', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }

    @Mutation(() => ListDetail_)
    async CreateListDetail(
        @Arg('input', () => CreateListDetailInput) input: CreateListDetailInput,
        @Ctx() { dataSource, userPayload }: AppContext, 
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeCreate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('List Details', this.GetUserFromPayload(userPayload));
            await entityObject.NewRecord();
            entityObject.SetMany(input);
            if (await entityObject.Save()) {
                // save worked, fire the AfterCreate event and then return all the data
                await this.AfterCreate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else 
                // save failed, return null
                return null;
        }
        else    
            return null;
    }

    // Before/After CREATE Event Hooks for Sub-Classes to Override
    protected async BeforeCreate(dataSource: DataSource, input: CreateListDetailInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterCreate(dataSource: DataSource, input: CreateListDetailInput) {
        const i = input, d = dataSource; // prevent error
    }
    
    @Mutation(() => ListDetail_)
    async UpdateListDetail(
        @Arg('input', () => UpdateListDetailInput) input: UpdateListDetailInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('List Details', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for List Details
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateListDetailInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateListDetailInput) {
        const i = input, d = dataSource; // prevent error
    }

    @Mutation(() => Int)
    async DeleteListDetail(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        if (await this.BeforeDelete(dataSource, ID)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('List Details', this.GetUserFromPayload(userPayload));
            await entityObject.Load(ID)
            if (await entityObject.Delete()) {
                await this.AfterDelete(dataSource, ID); // fire event
                return ID;
            }
            else 
                return null; // delete failed
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeDelete(dataSource: DataSource, ID: number): Promise<boolean> {
        const i = ID, d = dataSource; // prevent error;
        return true;
    }
    protected async AfterDelete(dataSource: DataSource, ID: number) {
        const i = ID, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for User View Runs
//****************************************************************************
@ViewEntity({
   name: 'vwUserViewRuns',
   synchronize: false,
})
@ObjectType()
export class UserViewRun_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field(() => Int) 
    @Column()
    UserViewID: number;
      
    @Field() 
    @MaxLength(8)
    @Column()
    RunAt: Date;
      
    @Field(() => Int) 
    @Column()
    RunByUserID: number;
      
    @Field() 
    @MaxLength(200)
    @ViewColumn()
    UserView: string;
      
    @Field() 
    @MaxLength(200)
    @ViewColumn()
    RunByUser: string;
    
    @Field(() => [UserViewRunDetail_])
    @OneToMany(() => UserViewRunDetail_, () => null)
    UserViewRunDetails: UserViewRunDetail_[]; // Link to UserViewRunDetails

}
        
//****************************************************************************
// INPUT TYPE for User View Runs   
//****************************************************************************
@InputType()
export class CreateUserViewRunInput {
    @Field(() => Int, )
    ID: number;

    @Field(() => Int, )
    UserViewID: number;

    @Field()
    RunAt: Date;

    @Field(() => Int, )
    RunByUserID: number;
}

        
//****************************************************************************
// INPUT TYPE for User View Runs   
//****************************************************************************
@InputType()
export class UpdateUserViewRunInput {
    @Field(() => Int, )
    ID: number;

    @Field(() => Int, )
    UserViewID: number;

    @Field()
    RunAt: Date;

    @Field(() => Int, )
    RunByUserID: number;
}

//****************************************************************************
// RESOLVER for User View Runs
//****************************************************************************
@ObjectType()
export class RunUserViewRunViewResult {
    @Field(() => [UserViewRun_])
    Results: UserViewRun_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(UserViewRun_)
export class UserViewRunResolver extends ResolverBase {
    @Query(() => RunUserViewRunViewResult)
    async RunUserViewRunViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunUserViewRunViewResult)
    async RunUserViewRunViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunUserViewRunViewResult)
    async RunUserViewRunDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'User View Runs';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => UserViewRun_, { nullable: true })
    async UserViewRun(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<UserViewRun_ | null> {
        this.CheckUserReadPermissions('User View Runs', userPayload);
        const sSQL = `SELECT * FROM vwUserViewRuns WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('User View Runs', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }
  
    @FieldResolver(() => [UserViewRunDetail_])
    async UserViewRunDetails(@Root() userviewrun: UserViewRun_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('User View Run Details', userPayload);
        const sSQL = `SELECT * FROM vwUserViewRunDetails WHERE UserViewRunID=${userviewrun.ID} ` + this.getRowLevelSecurityWhereClause('User View Run Details', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
    
    @Mutation(() => UserViewRun_)
    async CreateUserViewRun(
        @Arg('input', () => CreateUserViewRunInput) input: CreateUserViewRunInput,
        @Ctx() { dataSource, userPayload }: AppContext, 
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeCreate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('User View Runs', this.GetUserFromPayload(userPayload));
            await entityObject.NewRecord();
            entityObject.SetMany(input);
            if (await entityObject.Save()) {
                // save worked, fire the AfterCreate event and then return all the data
                await this.AfterCreate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else 
                // save failed, return null
                return null;
        }
        else    
            return null;
    }

    // Before/After CREATE Event Hooks for Sub-Classes to Override
    protected async BeforeCreate(dataSource: DataSource, input: CreateUserViewRunInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterCreate(dataSource: DataSource, input: CreateUserViewRunInput) {
        const i = input, d = dataSource; // prevent error
    }
    
    @Mutation(() => UserViewRun_)
    async UpdateUserViewRun(
        @Arg('input', () => UpdateUserViewRunInput) input: UpdateUserViewRunInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('User View Runs', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for User View Runs
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateUserViewRunInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateUserViewRunInput) {
        const i = input, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for User View Run Details
//****************************************************************************
@ViewEntity({
   name: 'vwUserViewRunDetails',
   synchronize: false,
})
@ObjectType()
export class UserViewRunDetail_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field(() => Int) 
    @Column()
    UserViewRunID: number;
      
    @Field(() => Int) 
    @Column()
    RecordID: number;
      
    @Field(() => Int) 
    @ViewColumn()
    UserViewID: number;
      
    @Field(() => Int) 
    @ViewColumn()
    EntityID: number;
    
}
        
//****************************************************************************
// INPUT TYPE for User View Run Details   
//****************************************************************************
@InputType()
export class CreateUserViewRunDetailInput {
    @Field(() => Int, )
    ID: number;

    @Field(() => Int, )
    UserViewRunID: number;

    @Field(() => Int, )
    RecordID: number;
}

        
//****************************************************************************
// INPUT TYPE for User View Run Details   
//****************************************************************************
@InputType()
export class UpdateUserViewRunDetailInput {
    @Field(() => Int, )
    ID: number;

    @Field(() => Int, )
    UserViewRunID: number;

    @Field(() => Int, )
    RecordID: number;
}

//****************************************************************************
// RESOLVER for User View Run Details
//****************************************************************************
@ObjectType()
export class RunUserViewRunDetailViewResult {
    @Field(() => [UserViewRunDetail_])
    Results: UserViewRunDetail_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(UserViewRunDetail_)
export class UserViewRunDetailResolver extends ResolverBase {
    @Query(() => RunUserViewRunDetailViewResult)
    async RunUserViewRunDetailViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunUserViewRunDetailViewResult)
    async RunUserViewRunDetailViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunUserViewRunDetailViewResult)
    async RunUserViewRunDetailDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'User View Run Details';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => UserViewRunDetail_, { nullable: true })
    async UserViewRunDetail(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<UserViewRunDetail_ | null> {
        this.CheckUserReadPermissions('User View Run Details', userPayload);
        const sSQL = `SELECT * FROM vwUserViewRunDetails WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('User View Run Details', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }

    @Mutation(() => UserViewRunDetail_)
    async CreateUserViewRunDetail(
        @Arg('input', () => CreateUserViewRunDetailInput) input: CreateUserViewRunDetailInput,
        @Ctx() { dataSource, userPayload }: AppContext, 
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeCreate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('User View Run Details', this.GetUserFromPayload(userPayload));
            await entityObject.NewRecord();
            entityObject.SetMany(input);
            if (await entityObject.Save()) {
                // save worked, fire the AfterCreate event and then return all the data
                await this.AfterCreate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else 
                // save failed, return null
                return null;
        }
        else    
            return null;
    }

    // Before/After CREATE Event Hooks for Sub-Classes to Override
    protected async BeforeCreate(dataSource: DataSource, input: CreateUserViewRunDetailInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterCreate(dataSource: DataSource, input: CreateUserViewRunDetailInput) {
        const i = input, d = dataSource; // prevent error
    }
    
    @Mutation(() => UserViewRunDetail_)
    async UpdateUserViewRunDetail(
        @Arg('input', () => UpdateUserViewRunDetailInput) input: UpdateUserViewRunDetailInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('User View Run Details', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for User View Run Details
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateUserViewRunDetailInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateUserViewRunDetailInput) {
        const i = input, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for Workflow Runs
//****************************************************************************
@ViewEntity({
   name: 'vwWorkflowRuns',
   synchronize: false,
})
@ObjectType()
export class WorkflowRun_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field() 
    @MaxLength(200)
    @Column()
    WorkflowName: string;
      
    @Field() 
    @MaxLength(200)
    @Column()
    ExternalSystemRecordID: string;
      
    @Field() 
    @MaxLength(8)
    @Column()
    StartedAt: Date;
      
    @Field({nullable: true}) 
    @MaxLength(8)
    @Column()
    EndedAt?: Date;
      
    @Field() 
    @MaxLength(20)
    @Column()
    Status: string;
      
    @Field({nullable: true}) 
    @Column()
    Results?: string;
      
    @Field() 
    @MaxLength(200)
    @ViewColumn()
    Workflow: string;
      
    @Field() 
    @MaxLength(200)
    @ViewColumn()
    WorkflowEngineName: string;
    
}
        
//****************************************************************************
// INPUT TYPE for Workflow Runs   
//****************************************************************************
@InputType()
export class UpdateWorkflowRunInput {
    @Field(() => Int, )
    ID: number;

    @Field()
    WorkflowName: string;

    @Field()
    ExternalSystemRecordID: string;

    @Field()
    StartedAt: Date;

    @Field({ nullable: true })
    EndedAt: Date;

    @Field()
    Status: string;

    @Field({ nullable: true })
    Results: string;
}

//****************************************************************************
// RESOLVER for Workflow Runs
//****************************************************************************
@ObjectType()
export class RunWorkflowRunViewResult {
    @Field(() => [WorkflowRun_])
    Results: WorkflowRun_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(WorkflowRun_)
export class WorkflowRunResolver extends ResolverBase {
    @Query(() => RunWorkflowRunViewResult)
    async RunWorkflowRunViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunWorkflowRunViewResult)
    async RunWorkflowRunViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunWorkflowRunViewResult)
    async RunWorkflowRunDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Workflow Runs';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => WorkflowRun_, { nullable: true })
    async WorkflowRun(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<WorkflowRun_ | null> {
        this.CheckUserReadPermissions('Workflow Runs', userPayload);
        const sSQL = `SELECT * FROM vwWorkflowRuns WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Workflow Runs', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }

    @Mutation(() => WorkflowRun_)
    async UpdateWorkflowRun(
        @Arg('input', () => UpdateWorkflowRunInput) input: UpdateWorkflowRunInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Workflow Runs', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for Workflow Runs
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateWorkflowRunInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateWorkflowRunInput) {
        const i = input, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for Workflows
//****************************************************************************
@ViewEntity({
   name: 'vwWorkflows',
   synchronize: false,
})
@ObjectType()
export class Workflow_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field() 
    @MaxLength(200)
    @Column()
    Name: string;
      
    @Field({nullable: true}) 
    @Column()
    Description?: string;
      
    @Field() 
    @MaxLength(200)
    @Column()
    WorkflowEngineName: string;
      
    @Field() 
    @MaxLength(100)
    @Column()
    CompanyName: string;
      
    @Field() 
    @MaxLength(200)
    @Column()
    ExternalSystemRecordID: string;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
      
    @Field() 
    @MaxLength(8)
    @Column()
    UpdatedAt: Date;
    
    @Field(() => [Report_])
    @OneToMany(() => Report_, () => null)
    Reports: Report_[]; // Link to Reports

    @Field(() => [WorkflowRun_])
    @OneToMany(() => WorkflowRun_, () => null)
    WorkflowRuns: WorkflowRun_[]; // Link to WorkflowRuns

}
        
//****************************************************************************
// INPUT TYPE for Workflows   
//****************************************************************************
@InputType()
export class UpdateWorkflowInput {
    @Field(() => Int, )
    ID: number;

    @Field()
    Name: string;

    @Field({ nullable: true })
    Description: string;

    @Field()
    WorkflowEngineName: string;

    @Field()
    CompanyName: string;

    @Field()
    ExternalSystemRecordID: string;
}

//****************************************************************************
// RESOLVER for Workflows
//****************************************************************************
@ObjectType()
export class RunWorkflowViewResult {
    @Field(() => [Workflow_])
    Results: Workflow_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(Workflow_)
export class WorkflowResolver extends ResolverBase {
    @Query(() => RunWorkflowViewResult)
    async RunWorkflowViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunWorkflowViewResult)
    async RunWorkflowViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunWorkflowViewResult)
    async RunWorkflowDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Workflows';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => Workflow_, { nullable: true })
    async Workflow(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<Workflow_ | null> {
        this.CheckUserReadPermissions('Workflows', userPayload);
        const sSQL = `SELECT * FROM vwWorkflows WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Workflows', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }
  
    @FieldResolver(() => [Report_])
    async Reports(@Root() workflow: Workflow_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Reports', userPayload);
        const sSQL = `SELECT * FROM vwReports WHERE OutputWorkflowID=${workflow.ID} ` + this.getRowLevelSecurityWhereClause('Reports', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [WorkflowRun_])
    async WorkflowRuns(@Root() workflow: Workflow_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Workflow Runs', userPayload);
        const sSQL = `SELECT * FROM vwWorkflowRuns WHERE WorkflowName=${workflow.ID} ` + this.getRowLevelSecurityWhereClause('Workflow Runs', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
    
    @Mutation(() => Workflow_)
    async UpdateWorkflow(
        @Arg('input', () => UpdateWorkflowInput) input: UpdateWorkflowInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Workflows', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for Workflows
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateWorkflowInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateWorkflowInput) {
        const i = input, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for Workflow Engines
//****************************************************************************
@ViewEntity({
   name: 'vwWorkflowEngines',
   synchronize: false,
})
@ObjectType()
export class WorkflowEngine_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field() 
    @MaxLength(200)
    @Column()
    Name: string;
      
    @Field({nullable: true}) 
    @Column()
    Description?: string;
      
    @Field() 
    @MaxLength(1000)
    @Column()
    DriverPath: string;
      
    @Field() 
    @MaxLength(200)
    @Column()
    DriverClass: string;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
      
    @Field() 
    @MaxLength(8)
    @Column()
    UpdatedAt: Date;
    
    @Field(() => [Workflow_])
    @OneToMany(() => Workflow_, () => null)
    Workflows: Workflow_[]; // Link to Workflows

}
        
//****************************************************************************
// INPUT TYPE for Workflow Engines   
//****************************************************************************
@InputType()
export class UpdateWorkflowEngineInput {
    @Field(() => Int, )
    ID: number;

    @Field()
    Name: string;

    @Field({ nullable: true })
    Description: string;

    @Field()
    DriverPath: string;

    @Field()
    DriverClass: string;
}

//****************************************************************************
// RESOLVER for Workflow Engines
//****************************************************************************
@ObjectType()
export class RunWorkflowEngineViewResult {
    @Field(() => [WorkflowEngine_])
    Results: WorkflowEngine_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(WorkflowEngine_)
export class WorkflowEngineResolver extends ResolverBase {
    @Query(() => RunWorkflowEngineViewResult)
    async RunWorkflowEngineViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunWorkflowEngineViewResult)
    async RunWorkflowEngineViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunWorkflowEngineViewResult)
    async RunWorkflowEngineDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Workflow Engines';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => WorkflowEngine_, { nullable: true })
    async WorkflowEngine(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<WorkflowEngine_ | null> {
        this.CheckUserReadPermissions('Workflow Engines', userPayload);
        const sSQL = `SELECT * FROM vwWorkflowEngines WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Workflow Engines', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }
  
    @FieldResolver(() => [Workflow_])
    async Workflows(@Root() workflowengine: WorkflowEngine_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Workflows', userPayload);
        const sSQL = `SELECT * FROM vwWorkflows WHERE WorkflowEngineName=${workflowengine.ID} ` + this.getRowLevelSecurityWhereClause('Workflows', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
    
    @Mutation(() => WorkflowEngine_)
    async UpdateWorkflowEngine(
        @Arg('input', () => UpdateWorkflowEngineInput) input: UpdateWorkflowEngineInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Workflow Engines', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for Workflow Engines
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateWorkflowEngineInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateWorkflowEngineInput) {
        const i = input, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for Record Changes
//****************************************************************************
@ViewEntity({
   name: 'vwRecordChanges',
   synchronize: false,
})
@ObjectType({ description: 'Tracks history of all pending and complete data changes to records' })
export class RecordChange_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field(() => Int) 
    @Column()
    EntityID: number;
      
    @Field(() => Int) 
    @Column()
    RecordID: number;
      
    @Field(() => Int) 
    @Column()
    UserID: number;
      
    @Field() 
    @MaxLength(8)
    @Column()
    ChangedAt: Date;
      
    @Field() 
    @Column()
    ChangesJSON: string;
      
    @Field() 
    @Column()
    ChangesDescription: string;
      
    @Field() 
    @Column()
    FullRecordJSON: string;
      
    @Field() 
    @MaxLength(30)
    @Column()
    Status: string;
      
    @Field({nullable: true}) 
    @Column()
    Comments?: string;
      
    @Field() 
    @MaxLength(100)
    @ViewColumn()
    Entity: string;
      
    @Field() 
    @MaxLength(200)
    @ViewColumn()
    User: string;
    
}
        
//****************************************************************************
// INPUT TYPE for Record Changes   
//****************************************************************************
@InputType()
export class CreateRecordChangeInput {
    @Field(() => Int, )
    EntityID: number;

    @Field(() => Int, )
    RecordID: number;

    @Field(() => Int, )
    UserID: number;

    @Field()
    ChangedAt: Date;

    @Field()
    ChangesJSON: string;

    @Field()
    ChangesDescription: string;

    @Field()
    FullRecordJSON: string;

    @Field()
    Status: string;

    @Field({ nullable: true })
    Comments: string;
}

//****************************************************************************
// RESOLVER for Record Changes
//****************************************************************************
@ObjectType()
export class RunRecordChangeViewResult {
    @Field(() => [RecordChange_])
    Results: RecordChange_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(RecordChange_)
export class RecordChangeResolver extends ResolverBase {
    @Query(() => RunRecordChangeViewResult)
    async RunRecordChangeViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunRecordChangeViewResult)
    async RunRecordChangeViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunRecordChangeViewResult)
    async RunRecordChangeDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Record Changes';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RecordChange_, { nullable: true })
    async RecordChange(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<RecordChange_ | null> {
        this.CheckUserReadPermissions('Record Changes', userPayload);
        const sSQL = `SELECT * FROM vwRecordChanges WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Record Changes', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }

    @Mutation(() => RecordChange_)
    async CreateRecordChange(
        @Arg('input', () => CreateRecordChangeInput) input: CreateRecordChangeInput,
        @Ctx() { dataSource, userPayload }: AppContext, 
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeCreate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Record Changes', this.GetUserFromPayload(userPayload));
            await entityObject.NewRecord();
            entityObject.SetMany(input);
            if (await entityObject.Save()) {
                // save worked, fire the AfterCreate event and then return all the data
                await this.AfterCreate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else 
                // save failed, return null
                return null;
        }
        else    
            return null;
    }

    // Before/After CREATE Event Hooks for Sub-Classes to Override
    protected async BeforeCreate(dataSource: DataSource, input: CreateRecordChangeInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterCreate(dataSource: DataSource, input: CreateRecordChangeInput) {
        const i = input, d = dataSource; // prevent error
    }
    
}

//****************************************************************************
// ENTITY CLASS for User Roles
//****************************************************************************
@ViewEntity({
   name: 'vwUserRoles',
   synchronize: false,
})
@ObjectType()
export class UserRole_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field(() => Int) 
    @Column()
    UserID: number;
      
    @Field() 
    @MaxLength(100)
    @Column()
    RoleName: string;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
      
    @Field() 
    @MaxLength(8)
    @Column()
    UpdatedAt: Date;
      
    @Field() 
    @MaxLength(200)
    @ViewColumn()
    User: string;
    
}
        
//****************************************************************************
// INPUT TYPE for User Roles   
//****************************************************************************
@InputType()
export class CreateUserRoleInput {
    @Field(() => Int, )
    UserID: number;

    @Field()
    RoleName: string;
}

//****************************************************************************
// RESOLVER for User Roles
//****************************************************************************
@ObjectType()
export class RunUserRoleViewResult {
    @Field(() => [UserRole_])
    Results: UserRole_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(UserRole_)
export class UserRoleResolver extends ResolverBase {
    @Query(() => RunUserRoleViewResult)
    async RunUserRoleViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunUserRoleViewResult)
    async RunUserRoleViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunUserRoleViewResult)
    async RunUserRoleDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'User Roles';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => UserRole_, { nullable: true })
    async UserRole(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<UserRole_ | null> {
        this.CheckUserReadPermissions('User Roles', userPayload);
        const sSQL = `SELECT * FROM vwUserRoles WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('User Roles', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }

    @Query(() => [UserRole_])
    AllUserRoles(@Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('User Roles', userPayload);
        const sSQL = 'SELECT * FROM vwUserRoles' + this.getRowLevelSecurityWhereClause('User Roles', userPayload, EntityPermissionType.Read, ' WHERE');
        return dataSource.query(sSQL);
    }

    @Mutation(() => UserRole_)
    async CreateUserRole(
        @Arg('input', () => CreateUserRoleInput) input: CreateUserRoleInput,
        @Ctx() { dataSource, userPayload }: AppContext, 
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeCreate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('User Roles', this.GetUserFromPayload(userPayload));
            await entityObject.NewRecord();
            entityObject.SetMany(input);
            if (await entityObject.Save()) {
                // save worked, fire the AfterCreate event and then return all the data
                await this.AfterCreate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else 
                // save failed, return null
                return null;
        }
        else    
            return null;
    }

    // Before/After CREATE Event Hooks for Sub-Classes to Override
    protected async BeforeCreate(dataSource: DataSource, input: CreateUserRoleInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterCreate(dataSource: DataSource, input: CreateUserRoleInput) {
        const i = input, d = dataSource; // prevent error
    }
    
}

//****************************************************************************
// ENTITY CLASS for Row Level Security Filters
//****************************************************************************
@ViewEntity({
   name: 'vwRowLevelSecurityFilters',
   synchronize: false,
})
@ObjectType()
export class RowLevelSecurityFilter_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field() 
    @MaxLength(200)
    @Column()
    Name: string;
      
    @Field({nullable: true}) 
    @Column()
    Description?: string;
      
    @Field({nullable: true}) 
    @Column()
    FilterText?: string;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
      
    @Field() 
    @MaxLength(8)
    @Column()
    UpdatedAt: Date;
    
    @Field(() => [EntityPermission_])
    @OneToMany(() => EntityPermission_, () => null)
    EntityPermissions: EntityPermission_[]; // Link to EntityPermissions

}
//****************************************************************************
// RESOLVER for Row Level Security Filters
//****************************************************************************
@ObjectType()
export class RunRowLevelSecurityFilterViewResult {
    @Field(() => [RowLevelSecurityFilter_])
    Results: RowLevelSecurityFilter_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(RowLevelSecurityFilter_)
export class RowLevelSecurityFilterResolver extends ResolverBase {
    @Query(() => RunRowLevelSecurityFilterViewResult)
    async RunRowLevelSecurityFilterViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunRowLevelSecurityFilterViewResult)
    async RunRowLevelSecurityFilterViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunRowLevelSecurityFilterViewResult)
    async RunRowLevelSecurityFilterDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Row Level Security Filters';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RowLevelSecurityFilter_, { nullable: true })
    async RowLevelSecurityFilter(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<RowLevelSecurityFilter_ | null> {
        this.CheckUserReadPermissions('Row Level Security Filters', userPayload);
        const sSQL = `SELECT * FROM vwRowLevelSecurityFilters WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Row Level Security Filters', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }

    @Query(() => [RowLevelSecurityFilter_])
    AllRowLevelSecurityFilters(@Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Row Level Security Filters', userPayload);
        const sSQL = 'SELECT * FROM vwRowLevelSecurityFilters' + this.getRowLevelSecurityWhereClause('Row Level Security Filters', userPayload, EntityPermissionType.Read, ' WHERE');
        return dataSource.query(sSQL);
    }
  
    @FieldResolver(() => [EntityPermission_])
    async EntityPermissions(@Root() rowlevelsecurityfilter: RowLevelSecurityFilter_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Entity Permissions', userPayload);
        const sSQL = `SELECT * FROM vwEntityPermissions WHERE ReadRLSFilterID=${rowlevelsecurityfilter.ID} ` + this.getRowLevelSecurityWhereClause('Entity Permissions', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
    
}

//****************************************************************************
// ENTITY CLASS for Audit Logs
//****************************************************************************
@ViewEntity({
   name: 'vwAuditLogs',
   synchronize: false,
})
@ObjectType()
export class AuditLog_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field({nullable: true}) 
    @MaxLength(100)
    @Column()
    AuditLogTypeName?: string;
      
    @Field(() => Int) 
    @Column()
    UserID: number;
      
    @Field({nullable: true}) 
    @MaxLength(200)
    @Column()
    AuthorizationName?: string;
      
    @Field() 
    @MaxLength(100)
    @Column()
    Status: string;
      
    @Field({nullable: true}) 
    @Column()
    Description?: string;
      
    @Field({nullable: true}) 
    @Column()
    Details?: string;
      
    @Field(() => Int, {nullable: true}) 
    @Column()
    EntityID?: number;
      
    @Field(() => Int, {nullable: true}) 
    @Column()
    RecordID?: number;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
      
    @Field() 
    @MaxLength(8)
    @Column()
    UpdatedAt: Date;
      
    @Field() 
    @MaxLength(200)
    @ViewColumn()
    User: string;
      
    @Field({nullable: true}) 
    @MaxLength(100)
    @ViewColumn()
    Entity?: string;
    
}
        
//****************************************************************************
// INPUT TYPE for Audit Logs   
//****************************************************************************
@InputType()
export class CreateAuditLogInput {
    @Field({ nullable: true })
    AuditLogTypeName: string;

    @Field(() => Int, )
    UserID: number;

    @Field({ nullable: true })
    AuthorizationName: string;

    @Field()
    Status: string;

    @Field({ nullable: true })
    Description: string;

    @Field({ nullable: true })
    Details: string;

    @Field(() => Int, { nullable: true })
    EntityID: number;

    @Field(() => Int, { nullable: true })
    RecordID: number;
}

        
//****************************************************************************
// INPUT TYPE for Audit Logs   
//****************************************************************************
@InputType()
export class UpdateAuditLogInput {
    @Field(() => Int, )
    ID: number;

    @Field({ nullable: true })
    AuditLogTypeName: string;

    @Field(() => Int, )
    UserID: number;

    @Field({ nullable: true })
    AuthorizationName: string;

    @Field()
    Status: string;

    @Field({ nullable: true })
    Description: string;

    @Field({ nullable: true })
    Details: string;

    @Field(() => Int, { nullable: true })
    EntityID: number;

    @Field(() => Int, { nullable: true })
    RecordID: number;
}

//****************************************************************************
// RESOLVER for Audit Logs
//****************************************************************************
@ObjectType()
export class RunAuditLogViewResult {
    @Field(() => [AuditLog_])
    Results: AuditLog_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(AuditLog_)
export class AuditLogResolver extends ResolverBase {
    @Query(() => RunAuditLogViewResult)
    async RunAuditLogViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunAuditLogViewResult)
    async RunAuditLogViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunAuditLogViewResult)
    async RunAuditLogDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Audit Logs';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => AuditLog_, { nullable: true })
    async AuditLog(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<AuditLog_ | null> {
        this.CheckUserReadPermissions('Audit Logs', userPayload);
        const sSQL = `SELECT * FROM vwAuditLogs WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Audit Logs', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }

    @Mutation(() => AuditLog_)
    async CreateAuditLog(
        @Arg('input', () => CreateAuditLogInput) input: CreateAuditLogInput,
        @Ctx() { dataSource, userPayload }: AppContext, 
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeCreate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Audit Logs', this.GetUserFromPayload(userPayload));
            await entityObject.NewRecord();
            entityObject.SetMany(input);
            if (await entityObject.Save()) {
                // save worked, fire the AfterCreate event and then return all the data
                await this.AfterCreate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else 
                // save failed, return null
                return null;
        }
        else    
            return null;
    }

    // Before/After CREATE Event Hooks for Sub-Classes to Override
    protected async BeforeCreate(dataSource: DataSource, input: CreateAuditLogInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterCreate(dataSource: DataSource, input: CreateAuditLogInput) {
        const i = input, d = dataSource; // prevent error
    }
    
    @Mutation(() => AuditLog_)
    async UpdateAuditLog(
        @Arg('input', () => UpdateAuditLogInput) input: UpdateAuditLogInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Audit Logs', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for Audit Logs
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateAuditLogInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateAuditLogInput) {
        const i = input, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for Authorizations
//****************************************************************************
@ViewEntity({
   name: 'vwAuthorizations',
   synchronize: false,
})
@ObjectType()
export class Authorization_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field(() => Int, {nullable: true}) 
    @Column()
    ParentID?: number;
      
    @Field() 
    @MaxLength(200)
    @Column()
    Name: string;
      
    @Field(() => Boolean) 
    @Column()
    IsActive: boolean;
      
    @Field(() => Boolean) 
    @Column()
    UseAuditLog: boolean;
      
    @Field({nullable: true}) 
    @Column()
    Description?: string;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
      
    @Field() 
    @MaxLength(8)
    @Column()
    UpdatedAt: Date;
    
    @Field(() => [AuthorizationRole_])
    @OneToMany(() => AuthorizationRole_, () => null)
    AuthorizationRoles: AuthorizationRole_[]; // Link to AuthorizationRoles

    @Field(() => [Authorization_])
    @OneToMany(() => Authorization_, () => null)
    Authorizations: Authorization_[]; // Link to Authorizations

    @Field(() => [AuditLogType_])
    @OneToMany(() => AuditLogType_, () => null)
    AuditLogTypes: AuditLogType_[]; // Link to AuditLogTypes

    @Field(() => [AuditLog_])
    @OneToMany(() => AuditLog_, () => null)
    AuditLogs: AuditLog_[]; // Link to AuditLogs

}
//****************************************************************************
// RESOLVER for Authorizations
//****************************************************************************
@ObjectType()
export class RunAuthorizationViewResult {
    @Field(() => [Authorization_])
    Results: Authorization_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(Authorization_)
export class AuthorizationResolver extends ResolverBase {
    @Query(() => RunAuthorizationViewResult)
    async RunAuthorizationViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunAuthorizationViewResult)
    async RunAuthorizationViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunAuthorizationViewResult)
    async RunAuthorizationDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Authorizations';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => Authorization_, { nullable: true })
    async Authorization(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<Authorization_ | null> {
        this.CheckUserReadPermissions('Authorizations', userPayload);
        const sSQL = `SELECT * FROM vwAuthorizations WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Authorizations', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }

    @Query(() => [Authorization_])
    AllAuthorizations(@Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Authorizations', userPayload);
        const sSQL = 'SELECT * FROM vwAuthorizations' + this.getRowLevelSecurityWhereClause('Authorizations', userPayload, EntityPermissionType.Read, ' WHERE');
        return dataSource.query(sSQL);
    }
  
    @FieldResolver(() => [AuthorizationRole_])
    async AuthorizationRoles(@Root() authorization: Authorization_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Authorization Roles', userPayload);
        const sSQL = `SELECT * FROM vwAuthorizationRoles WHERE AuthorizationID=${authorization.ID} ` + this.getRowLevelSecurityWhereClause('Authorization Roles', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [Authorization_])
    async Authorizations(@Root() authorization: Authorization_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Authorizations', userPayload);
        const sSQL = `SELECT * FROM vwAuthorizations WHERE ParentID=${authorization.ID} ` + this.getRowLevelSecurityWhereClause('Authorizations', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [AuditLogType_])
    async AuditLogTypes(@Root() authorization: Authorization_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Audit Log Types', userPayload);
        const sSQL = `SELECT * FROM vwAuditLogTypes WHERE AuthorizationName=${authorization.ID} ` + this.getRowLevelSecurityWhereClause('Audit Log Types', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [AuditLog_])
    async AuditLogs(@Root() authorization: Authorization_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Audit Logs', userPayload);
        const sSQL = `SELECT * FROM vwAuditLogs WHERE AuthorizationName=${authorization.ID} ` + this.getRowLevelSecurityWhereClause('Audit Logs', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
    
}

//****************************************************************************
// ENTITY CLASS for Authorization Roles
//****************************************************************************
@ViewEntity({
   name: 'vwAuthorizationRoles',
   synchronize: false,
})
@ObjectType()
export class AuthorizationRole_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field({nullable: true}) 
    @MaxLength(200)
    @Column()
    AuthorizationName?: string;
      
    @Field({nullable: true}) 
    @MaxLength(100)
    @Column()
    RoleName?: string;
      
    @Field() 
    @MaxLength(20)
    @Column()
    Type: string;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
      
    @Field() 
    @MaxLength(8)
    @Column()
    UpdatedAt: Date;
    
}
//****************************************************************************
// RESOLVER for Authorization Roles
//****************************************************************************
@ObjectType()
export class RunAuthorizationRoleViewResult {
    @Field(() => [AuthorizationRole_])
    Results: AuthorizationRole_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(AuthorizationRole_)
export class AuthorizationRoleResolver extends ResolverBase {
    @Query(() => RunAuthorizationRoleViewResult)
    async RunAuthorizationRoleViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunAuthorizationRoleViewResult)
    async RunAuthorizationRoleViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunAuthorizationRoleViewResult)
    async RunAuthorizationRoleDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Authorization Roles';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => AuthorizationRole_, { nullable: true })
    async AuthorizationRole(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<AuthorizationRole_ | null> {
        this.CheckUserReadPermissions('Authorization Roles', userPayload);
        const sSQL = `SELECT * FROM vwAuthorizationRoles WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Authorization Roles', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }

    @Query(() => [AuthorizationRole_])
    AllAuthorizationRoles(@Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Authorization Roles', userPayload);
        const sSQL = 'SELECT * FROM vwAuthorizationRoles' + this.getRowLevelSecurityWhereClause('Authorization Roles', userPayload, EntityPermissionType.Read, ' WHERE');
        return dataSource.query(sSQL);
    }

}

//****************************************************************************
// ENTITY CLASS for Audit Log Types
//****************************************************************************
@ViewEntity({
   name: 'vwAuditLogTypes',
   synchronize: false,
})
@ObjectType()
export class AuditLogType_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field(() => Int, {nullable: true}) 
    @Column()
    ParentID?: number;
      
    @Field() 
    @MaxLength(100)
    @Column()
    Name: string;
      
    @Field({nullable: true}) 
    @Column()
    Description?: string;
      
    @Field({nullable: true}) 
    @MaxLength(200)
    @Column()
    AuthorizationName?: string;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
      
    @Field() 
    @MaxLength(8)
    @Column()
    UpdatedAt: Date;
      
    @Field({nullable: true}) 
    @MaxLength(100)
    @ViewColumn()
    Parent?: string;
    
    @Field(() => [AuditLog_])
    @OneToMany(() => AuditLog_, () => null)
    AuditLogs: AuditLog_[]; // Link to AuditLogs

    @Field(() => [AuditLogType_])
    @OneToMany(() => AuditLogType_, () => null)
    AuditLogTypes: AuditLogType_[]; // Link to AuditLogTypes

}
//****************************************************************************
// RESOLVER for Audit Log Types
//****************************************************************************
@ObjectType()
export class RunAuditLogTypeViewResult {
    @Field(() => [AuditLogType_])
    Results: AuditLogType_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(AuditLogType_)
export class AuditLogTypeResolver extends ResolverBase {
    @Query(() => RunAuditLogTypeViewResult)
    async RunAuditLogTypeViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunAuditLogTypeViewResult)
    async RunAuditLogTypeViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunAuditLogTypeViewResult)
    async RunAuditLogTypeDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Audit Log Types';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => AuditLogType_, { nullable: true })
    async AuditLogType(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<AuditLogType_ | null> {
        this.CheckUserReadPermissions('Audit Log Types', userPayload);
        const sSQL = `SELECT * FROM vwAuditLogTypes WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Audit Log Types', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }

    @Query(() => [AuditLogType_])
    AllAuditLogTypes(@Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Audit Log Types', userPayload);
        const sSQL = 'SELECT * FROM vwAuditLogTypes' + this.getRowLevelSecurityWhereClause('Audit Log Types', userPayload, EntityPermissionType.Read, ' WHERE');
        return dataSource.query(sSQL);
    }
  
    @FieldResolver(() => [AuditLog_])
    async AuditLogs(@Root() auditlogtype: AuditLogType_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Audit Logs', userPayload);
        const sSQL = `SELECT * FROM vwAuditLogs WHERE AuditLogTypeName=${auditlogtype.ID} ` + this.getRowLevelSecurityWhereClause('Audit Logs', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [AuditLogType_])
    async AuditLogTypes(@Root() auditlogtype: AuditLogType_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Audit Log Types', userPayload);
        const sSQL = `SELECT * FROM vwAuditLogTypes WHERE ParentID=${auditlogtype.ID} ` + this.getRowLevelSecurityWhereClause('Audit Log Types', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
    
}

//****************************************************************************
// ENTITY CLASS for Entity Field Values
//****************************************************************************
@ViewEntity({
   name: 'vwEntityFieldValues',
   synchronize: false,
})
@ObjectType()
export class EntityFieldValue_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field(() => Int) 
    @Column()
    EntityID: number;
      
    @Field() 
    @MaxLength(100)
    @Column()
    EntityFieldName: string;
      
    @Field(() => Int) 
    @Column()
    Sequence: number;
      
    @Field() 
    @MaxLength(510)
    @Column()
    Value: string;
      
    @Field({nullable: true}) 
    @MaxLength(100)
    @Column()
    Code?: string;
      
    @Field({nullable: true}) 
    @Column()
    Description?: string;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
      
    @Field() 
    @MaxLength(8)
    @Column()
    UpdatedAt: Date;
      
    @Field() 
    @MaxLength(100)
    @ViewColumn()
    Entity: string;
    
}
//****************************************************************************
// RESOLVER for Entity Field Values
//****************************************************************************
@ObjectType()
export class RunEntityFieldValueViewResult {
    @Field(() => [EntityFieldValue_])
    Results: EntityFieldValue_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(EntityFieldValue_)
export class EntityFieldValueResolver extends ResolverBase {
    @Query(() => RunEntityFieldValueViewResult)
    async RunEntityFieldValueViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunEntityFieldValueViewResult)
    async RunEntityFieldValueViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunEntityFieldValueViewResult)
    async RunEntityFieldValueDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Entity Field Values';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => EntityFieldValue_, { nullable: true })
    async EntityFieldValue(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<EntityFieldValue_ | null> {
        this.CheckUserReadPermissions('Entity Field Values', userPayload);
        const sSQL = `SELECT * FROM vwEntityFieldValues WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Entity Field Values', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }

    @Query(() => [EntityFieldValue_])
    AllEntityFieldValues(@Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Entity Field Values', userPayload);
        const sSQL = 'SELECT * FROM vwEntityFieldValues' + this.getRowLevelSecurityWhereClause('Entity Field Values', userPayload, EntityPermissionType.Read, ' WHERE');
        return dataSource.query(sSQL);
    }

}

//****************************************************************************
// ENTITY CLASS for AI Models
//****************************************************************************
@ViewEntity({
   name: 'vwAIModels',
   synchronize: false,
})
@ObjectType()
export class AIModel_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field() 
    @MaxLength(100)
    @Column()
    Name: string;
      
    @Field({nullable: true}) 
    @MaxLength(100)
    @Column()
    Vendor?: string;
      
    @Field(() => Int) 
    @Column()
    AIModelTypeID: number;
      
    @Field({nullable: true}) 
    @Column()
    Description?: string;
      
    @Field({nullable: true}) 
    @MaxLength(200)
    @Column()
    DriverClass?: string;
      
    @Field({nullable: true}) 
    @MaxLength(510)
    @Column()
    DriverImportPath?: string;
      
    @Field(() => Boolean) 
    @Column()
    IsActive: boolean;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
      
    @Field() 
    @MaxLength(8)
    @Column()
    UpdatedAt: Date;
    
    @Field(() => [AIAction_])
    @OneToMany(() => AIAction_, () => null)
    AIActions: AIAction_[]; // Link to AIActions

    @Field(() => [AIModelAction_])
    @OneToMany(() => AIModelAction_, () => null)
    AIModelActions: AIModelAction_[]; // Link to AIModelActions

    @Field(() => [EntityAIAction_])
    @OneToMany(() => EntityAIAction_, () => null)
    EntityAIActions: EntityAIAction_[]; // Link to EntityAIActions

}
        
//****************************************************************************
// INPUT TYPE for AI Models   
//****************************************************************************
@InputType()
export class UpdateAIModelInput {
    @Field(() => Int, )
    ID: number;

    @Field()
    Name: string;

    @Field({ nullable: true })
    Vendor: string;

    @Field(() => Int, )
    AIModelTypeID: number;

    @Field({ nullable: true })
    Description: string;

    @Field({ nullable: true })
    DriverClass: string;

    @Field({ nullable: true })
    DriverImportPath: string;

    @Field(() => Boolean, )
    IsActive: boolean;
}

//****************************************************************************
// RESOLVER for AI Models
//****************************************************************************
@ObjectType()
export class RunAIModelViewResult {
    @Field(() => [AIModel_])
    Results: AIModel_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(AIModel_)
export class AIModelResolver extends ResolverBase {
    @Query(() => RunAIModelViewResult)
    async RunAIModelViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunAIModelViewResult)
    async RunAIModelViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunAIModelViewResult)
    async RunAIModelDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'AI Models';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => AIModel_, { nullable: true })
    async AIModel(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<AIModel_ | null> {
        this.CheckUserReadPermissions('AI Models', userPayload);
        const sSQL = `SELECT * FROM vwAIModels WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('AI Models', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }

    @Query(() => [AIModel_])
    AllAIModels(@Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('AI Models', userPayload);
        const sSQL = 'SELECT * FROM vwAIModels' + this.getRowLevelSecurityWhereClause('AI Models', userPayload, EntityPermissionType.Read, ' WHERE');
        return dataSource.query(sSQL);
    }
  
    @FieldResolver(() => [AIAction_])
    async AIActions(@Root() aimodel: AIModel_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('AI Actions', userPayload);
        const sSQL = `SELECT * FROM vwAIActions WHERE DefaultModelID=${aimodel.ID} ` + this.getRowLevelSecurityWhereClause('AI Actions', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [AIModelAction_])
    async AIModelActions(@Root() aimodel: AIModel_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('AI Model Actions', userPayload);
        const sSQL = `SELECT * FROM vwAIModelActions WHERE AIModelID=${aimodel.ID} ` + this.getRowLevelSecurityWhereClause('AI Model Actions', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [EntityAIAction_])
    async EntityAIActions(@Root() aimodel: AIModel_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Entity AI Actions', userPayload);
        const sSQL = `SELECT * FROM vwEntityAIActions WHERE AIModelID=${aimodel.ID} ` + this.getRowLevelSecurityWhereClause('Entity AI Actions', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
    
    @Mutation(() => AIModel_)
    async UpdateAIModel(
        @Arg('input', () => UpdateAIModelInput) input: UpdateAIModelInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('AI Models', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for AI Models
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateAIModelInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateAIModelInput) {
        const i = input, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for AI Actions
//****************************************************************************
@ViewEntity({
   name: 'vwAIActions',
   synchronize: false,
})
@ObjectType()
export class AIAction_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field() 
    @MaxLength(100)
    @Column()
    Name: string;
      
    @Field({nullable: true}) 
    @Column()
    Description?: string;
      
    @Field(() => Int, {nullable: true}) 
    @Column()
    DefaultModelID?: number;
      
    @Field({nullable: true}) 
    @Column()
    DefaultPrompt?: string;
      
    @Field(() => Boolean) 
    @Column()
    IsActive: boolean;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
      
    @Field() 
    @MaxLength(8)
    @Column()
    UpdatedAt: Date;
      
    @Field({nullable: true}) 
    @MaxLength(100)
    @ViewColumn()
    DefaultModel?: string;
    
    @Field(() => [AIModelAction_])
    @OneToMany(() => AIModelAction_, () => null)
    AIModelActions: AIModelAction_[]; // Link to AIModelActions

    @Field(() => [EntityAIAction_])
    @OneToMany(() => EntityAIAction_, () => null)
    EntityAIActions: EntityAIAction_[]; // Link to EntityAIActions

}
        
//****************************************************************************
// INPUT TYPE for AI Actions   
//****************************************************************************
@InputType()
export class UpdateAIActionInput {
    @Field(() => Int, )
    ID: number;

    @Field()
    Name: string;

    @Field({ nullable: true })
    Description: string;

    @Field(() => Int, { nullable: true })
    DefaultModelID: number;

    @Field({ nullable: true })
    DefaultPrompt: string;

    @Field(() => Boolean, )
    IsActive: boolean;
}

//****************************************************************************
// RESOLVER for AI Actions
//****************************************************************************
@ObjectType()
export class RunAIActionViewResult {
    @Field(() => [AIAction_])
    Results: AIAction_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(AIAction_)
export class AIActionResolver extends ResolverBase {
    @Query(() => RunAIActionViewResult)
    async RunAIActionViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunAIActionViewResult)
    async RunAIActionViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunAIActionViewResult)
    async RunAIActionDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'AI Actions';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => AIAction_, { nullable: true })
    async AIAction(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<AIAction_ | null> {
        this.CheckUserReadPermissions('AI Actions', userPayload);
        const sSQL = `SELECT * FROM vwAIActions WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('AI Actions', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }

    @Query(() => [AIAction_])
    AllAIActions(@Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('AI Actions', userPayload);
        const sSQL = 'SELECT * FROM vwAIActions' + this.getRowLevelSecurityWhereClause('AI Actions', userPayload, EntityPermissionType.Read, ' WHERE');
        return dataSource.query(sSQL);
    }
  
    @FieldResolver(() => [AIModelAction_])
    async AIModelActions(@Root() aiaction: AIAction_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('AI Model Actions', userPayload);
        const sSQL = `SELECT * FROM vwAIModelActions WHERE AIActionID=${aiaction.ID} ` + this.getRowLevelSecurityWhereClause('AI Model Actions', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [EntityAIAction_])
    async EntityAIActions(@Root() aiaction: AIAction_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Entity AI Actions', userPayload);
        const sSQL = `SELECT * FROM vwEntityAIActions WHERE AIActionID=${aiaction.ID} ` + this.getRowLevelSecurityWhereClause('Entity AI Actions', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
    
    @Mutation(() => AIAction_)
    async UpdateAIAction(
        @Arg('input', () => UpdateAIActionInput) input: UpdateAIActionInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('AI Actions', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for AI Actions
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateAIActionInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateAIActionInput) {
        const i = input, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for AI Model Actions
//****************************************************************************
@ViewEntity({
   name: 'vwAIModelActions',
   synchronize: false,
})
@ObjectType()
export class AIModelAction_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field(() => Int) 
    @Column()
    AIModelID: number;
      
    @Field(() => Int) 
    @Column()
    AIActionID: number;
      
    @Field(() => Boolean) 
    @Column()
    IsActive: boolean;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
      
    @Field() 
    @MaxLength(8)
    @Column()
    UpdatedAt: Date;
      
    @Field() 
    @MaxLength(100)
    @ViewColumn()
    AIModel: string;
      
    @Field() 
    @MaxLength(100)
    @ViewColumn()
    AIAction: string;
    
}
        
//****************************************************************************
// INPUT TYPE for AI Model Actions   
//****************************************************************************
@InputType()
export class UpdateAIModelActionInput {
    @Field(() => Int, )
    ID: number;

    @Field(() => Int, )
    AIModelID: number;

    @Field(() => Int, )
    AIActionID: number;

    @Field(() => Boolean, )
    IsActive: boolean;
}

//****************************************************************************
// RESOLVER for AI Model Actions
//****************************************************************************
@ObjectType()
export class RunAIModelActionViewResult {
    @Field(() => [AIModelAction_])
    Results: AIModelAction_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(AIModelAction_)
export class AIModelActionResolver extends ResolverBase {
    @Query(() => RunAIModelActionViewResult)
    async RunAIModelActionViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunAIModelActionViewResult)
    async RunAIModelActionViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunAIModelActionViewResult)
    async RunAIModelActionDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'AI Model Actions';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => AIModelAction_, { nullable: true })
    async AIModelAction(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<AIModelAction_ | null> {
        this.CheckUserReadPermissions('AI Model Actions', userPayload);
        const sSQL = `SELECT * FROM vwAIModelActions WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('AI Model Actions', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }

    @Query(() => [AIModelAction_])
    AllAIModelActions(@Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('AI Model Actions', userPayload);
        const sSQL = 'SELECT * FROM vwAIModelActions' + this.getRowLevelSecurityWhereClause('AI Model Actions', userPayload, EntityPermissionType.Read, ' WHERE');
        return dataSource.query(sSQL);
    }

    @Mutation(() => AIModelAction_)
    async UpdateAIModelAction(
        @Arg('input', () => UpdateAIModelActionInput) input: UpdateAIModelActionInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('AI Model Actions', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for AI Model Actions
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateAIModelActionInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateAIModelActionInput) {
        const i = input, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for Entity AI Actions
//****************************************************************************
@ViewEntity({
   name: 'vwEntityAIActions',
   synchronize: false,
})
@ObjectType()
export class EntityAIAction_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field(() => Int) 
    @Column()
    EntityID: number;
      
    @Field(() => Int) 
    @Column()
    AIActionID: number;
      
    @Field(() => Int, {nullable: true}) 
    @Column()
    AIModelID?: number;
      
    @Field() 
    @MaxLength(50)
    @Column()
    Name: string;
      
    @Field({nullable: true}) 
    @Column()
    Prompt?: string;
      
    @Field() 
    @MaxLength(30)
    @Column()
    TriggerEvent: string;
      
    @Field() 
    @Column()
    UserMessage: string;
      
    @Field() 
    @MaxLength(20)
    @Column()
    OutputType: string;
      
    @Field({nullable: true}) 
    @MaxLength(100)
    @Column()
    OutputField?: string;
      
    @Field(() => Boolean) 
    @Column()
    SkipIfOutputFieldNotEmpty: boolean;
      
    @Field(() => Int, {nullable: true}) 
    @Column()
    OutputEntityID?: number;
      
    @Field({nullable: true}) 
    @Column()
    Comments?: string;
      
    @Field() 
    @MaxLength(100)
    @ViewColumn()
    Entity: string;
      
    @Field() 
    @MaxLength(100)
    @ViewColumn()
    AIAction: string;
      
    @Field({nullable: true}) 
    @MaxLength(100)
    @ViewColumn()
    AIModel?: string;
      
    @Field({nullable: true}) 
    @MaxLength(100)
    @ViewColumn()
    OutputEntity?: string;
    
}
        
//****************************************************************************
// INPUT TYPE for Entity AI Actions   
//****************************************************************************
@InputType()
export class UpdateEntityAIActionInput {
    @Field(() => Int, )
    ID: number;

    @Field(() => Int, )
    EntityID: number;

    @Field(() => Int, )
    AIActionID: number;

    @Field(() => Int, { nullable: true })
    AIModelID: number;

    @Field()
    Name: string;

    @Field({ nullable: true })
    Prompt: string;

    @Field()
    TriggerEvent: string;

    @Field()
    UserMessage: string;

    @Field()
    OutputType: string;

    @Field({ nullable: true })
    OutputField: string;

    @Field(() => Boolean, )
    SkipIfOutputFieldNotEmpty: boolean;

    @Field(() => Int, { nullable: true })
    OutputEntityID: number;

    @Field({ nullable: true })
    Comments: string;
}

//****************************************************************************
// RESOLVER for Entity AI Actions
//****************************************************************************
@ObjectType()
export class RunEntityAIActionViewResult {
    @Field(() => [EntityAIAction_])
    Results: EntityAIAction_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(EntityAIAction_)
export class EntityAIActionResolver extends ResolverBase {
    @Query(() => RunEntityAIActionViewResult)
    async RunEntityAIActionViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunEntityAIActionViewResult)
    async RunEntityAIActionViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunEntityAIActionViewResult)
    async RunEntityAIActionDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Entity AI Actions';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => EntityAIAction_, { nullable: true })
    async EntityAIAction(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<EntityAIAction_ | null> {
        this.CheckUserReadPermissions('Entity AI Actions', userPayload);
        const sSQL = `SELECT * FROM vwEntityAIActions WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Entity AI Actions', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }

    @Query(() => [EntityAIAction_])
    AllEntityAIActions(@Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Entity AI Actions', userPayload);
        const sSQL = 'SELECT * FROM vwEntityAIActions' + this.getRowLevelSecurityWhereClause('Entity AI Actions', userPayload, EntityPermissionType.Read, ' WHERE');
        return dataSource.query(sSQL);
    }

    @Mutation(() => EntityAIAction_)
    async UpdateEntityAIAction(
        @Arg('input', () => UpdateEntityAIActionInput) input: UpdateEntityAIActionInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Entity AI Actions', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for Entity AI Actions
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateEntityAIActionInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateEntityAIActionInput) {
        const i = input, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for AI Model Types
//****************************************************************************
@ViewEntity({
   name: 'vwAIModelTypes',
   synchronize: false,
})
@ObjectType()
export class AIModelType_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field() 
    @MaxLength(100)
    @Column()
    Name: string;
      
    @Field({nullable: true}) 
    @Column()
    Description?: string;
    
    @Field(() => [AIModel_])
    @OneToMany(() => AIModel_, () => null)
    AIModels: AIModel_[]; // Link to AIModels

}
        
//****************************************************************************
// INPUT TYPE for AI Model Types   
//****************************************************************************
@InputType()
export class UpdateAIModelTypeInput {
    @Field(() => Int, )
    ID: number;

    @Field()
    Name: string;

    @Field({ nullable: true })
    Description: string;
}

//****************************************************************************
// RESOLVER for AI Model Types
//****************************************************************************
@ObjectType()
export class RunAIModelTypeViewResult {
    @Field(() => [AIModelType_])
    Results: AIModelType_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(AIModelType_)
export class AIModelTypeResolver extends ResolverBase {
    @Query(() => RunAIModelTypeViewResult)
    async RunAIModelTypeViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunAIModelTypeViewResult)
    async RunAIModelTypeViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunAIModelTypeViewResult)
    async RunAIModelTypeDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'AI Model Types';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => AIModelType_, { nullable: true })
    async AIModelType(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<AIModelType_ | null> {
        this.CheckUserReadPermissions('AI Model Types', userPayload);
        const sSQL = `SELECT * FROM vwAIModelTypes WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('AI Model Types', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }

    @Query(() => [AIModelType_])
    AllAIModelTypes(@Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('AI Model Types', userPayload);
        const sSQL = 'SELECT * FROM vwAIModelTypes' + this.getRowLevelSecurityWhereClause('AI Model Types', userPayload, EntityPermissionType.Read, ' WHERE');
        return dataSource.query(sSQL);
    }
  
    @FieldResolver(() => [AIModel_])
    async AIModels(@Root() aimodeltype: AIModelType_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('AI Models', userPayload);
        const sSQL = `SELECT * FROM vwAIModels WHERE AIModelTypeID=${aimodeltype.ID} ` + this.getRowLevelSecurityWhereClause('AI Models', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
    
    @Mutation(() => AIModelType_)
    async UpdateAIModelType(
        @Arg('input', () => UpdateAIModelTypeInput) input: UpdateAIModelTypeInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('AI Model Types', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for AI Model Types
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateAIModelTypeInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateAIModelTypeInput) {
        const i = input, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for Queue Types
//****************************************************************************
@ViewEntity({
   name: 'vwQueueTypes',
   synchronize: false,
})
@ObjectType()
export class QueueType_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field() 
    @MaxLength(100)
    @Column()
    Name: string;
      
    @Field({nullable: true}) 
    @Column()
    Description?: string;
      
    @Field() 
    @MaxLength(200)
    @Column()
    DriverClass: string;
      
    @Field({nullable: true}) 
    @MaxLength(400)
    @Column()
    DriverImportPath?: string;
      
    @Field(() => Boolean) 
    @Column()
    IsActive: boolean;
    
    @Field(() => [Queue_])
    @OneToMany(() => Queue_, () => null)
    Queues: Queue_[]; // Link to Queues

}
//****************************************************************************
// RESOLVER for Queue Types
//****************************************************************************
@ObjectType()
export class RunQueueTypeViewResult {
    @Field(() => [QueueType_])
    Results: QueueType_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(QueueType_)
export class QueueTypeResolver extends ResolverBase {
    @Query(() => RunQueueTypeViewResult)
    async RunQueueTypeViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunQueueTypeViewResult)
    async RunQueueTypeViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunQueueTypeViewResult)
    async RunQueueTypeDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Queue Types';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => QueueType_, { nullable: true })
    async QueueType(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<QueueType_ | null> {
        this.CheckUserReadPermissions('Queue Types', userPayload);
        const sSQL = `SELECT * FROM vwQueueTypes WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Queue Types', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }
  
    @FieldResolver(() => [Queue_])
    async Queues(@Root() queuetype: QueueType_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Queues', userPayload);
        const sSQL = `SELECT * FROM vwQueues WHERE QueueTypeID=${queuetype.ID} ` + this.getRowLevelSecurityWhereClause('Queues', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
    
}

//****************************************************************************
// ENTITY CLASS for Queues
//****************************************************************************
@ViewEntity({
   name: 'vwQueues',
   synchronize: false,
})
@ObjectType()
export class Queue_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field() 
    @MaxLength(100)
    @Column()
    Name: string;
      
    @Field({nullable: true}) 
    @Column()
    Description?: string;
      
    @Field(() => Int) 
    @Column()
    QueueTypeID: number;
      
    @Field(() => Boolean) 
    @Column()
    IsActive: boolean;
      
    @Field(() => Int, {nullable: true}) 
    @Column()
    ProcessPID?: number;
      
    @Field({nullable: true}) 
    @MaxLength(60)
    @Column()
    ProcessPlatform?: string;
      
    @Field({nullable: true}) 
    @MaxLength(30)
    @Column()
    ProcessVersion?: string;
      
    @Field({nullable: true}) 
    @MaxLength(200)
    @Column()
    ProcessCwd?: string;
      
    @Field({nullable: true}) 
    @MaxLength(100)
    @Column()
    ProcessIPAddress?: string;
      
    @Field({nullable: true}) 
    @MaxLength(100)
    @Column()
    ProcessMacAddress?: string;
      
    @Field({nullable: true}) 
    @MaxLength(50)
    @Column()
    ProcessOSName?: string;
      
    @Field({nullable: true}) 
    @MaxLength(20)
    @Column()
    ProcessOSVersion?: string;
      
    @Field({nullable: true}) 
    @MaxLength(100)
    @Column()
    ProcessHostName?: string;
      
    @Field({nullable: true}) 
    @MaxLength(50)
    @Column()
    ProcessUserID?: string;
      
    @Field({nullable: true}) 
    @MaxLength(100)
    @Column()
    ProcessUserName?: string;
      
    @Field() 
    @MaxLength(8)
    @Column()
    LastHeartbeat: Date;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
      
    @Field() 
    @MaxLength(8)
    @Column()
    UpdatedAt: Date;
      
    @Field() 
    @MaxLength(100)
    @ViewColumn()
    QueueType: string;
    
    @Field(() => [QueueTask_])
    @OneToMany(() => QueueTask_, () => null)
    QueueTasks: QueueTask_[]; // Link to QueueTasks

}
        
//****************************************************************************
// INPUT TYPE for Queues   
//****************************************************************************
@InputType()
export class CreateQueueInput {
    @Field()
    Name: string;

    @Field({ nullable: true })
    Description: string;

    @Field(() => Int, )
    QueueTypeID: number;

    @Field(() => Boolean, )
    IsActive: boolean;

    @Field(() => Int, { nullable: true })
    ProcessPID: number;

    @Field({ nullable: true })
    ProcessPlatform: string;

    @Field({ nullable: true })
    ProcessVersion: string;

    @Field({ nullable: true })
    ProcessCwd: string;

    @Field({ nullable: true })
    ProcessIPAddress: string;

    @Field({ nullable: true })
    ProcessMacAddress: string;

    @Field({ nullable: true })
    ProcessOSName: string;

    @Field({ nullable: true })
    ProcessOSVersion: string;

    @Field({ nullable: true })
    ProcessHostName: string;

    @Field({ nullable: true })
    ProcessUserID: string;

    @Field({ nullable: true })
    ProcessUserName: string;

    @Field()
    LastHeartbeat: Date;
}

        
//****************************************************************************
// INPUT TYPE for Queues   
//****************************************************************************
@InputType()
export class UpdateQueueInput {
    @Field(() => Int, )
    ID: number;

    @Field()
    Name: string;

    @Field({ nullable: true })
    Description: string;

    @Field(() => Int, )
    QueueTypeID: number;

    @Field(() => Boolean, )
    IsActive: boolean;

    @Field(() => Int, { nullable: true })
    ProcessPID: number;

    @Field({ nullable: true })
    ProcessPlatform: string;

    @Field({ nullable: true })
    ProcessVersion: string;

    @Field({ nullable: true })
    ProcessCwd: string;

    @Field({ nullable: true })
    ProcessIPAddress: string;

    @Field({ nullable: true })
    ProcessMacAddress: string;

    @Field({ nullable: true })
    ProcessOSName: string;

    @Field({ nullable: true })
    ProcessOSVersion: string;

    @Field({ nullable: true })
    ProcessHostName: string;

    @Field({ nullable: true })
    ProcessUserID: string;

    @Field({ nullable: true })
    ProcessUserName: string;

    @Field()
    LastHeartbeat: Date;
}

//****************************************************************************
// RESOLVER for Queues
//****************************************************************************
@ObjectType()
export class RunQueueViewResult {
    @Field(() => [Queue_])
    Results: Queue_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(Queue_)
export class QueueResolver extends ResolverBase {
    @Query(() => RunQueueViewResult)
    async RunQueueViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunQueueViewResult)
    async RunQueueViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunQueueViewResult)
    async RunQueueDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Queues';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => Queue_, { nullable: true })
    async Queue(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<Queue_ | null> {
        this.CheckUserReadPermissions('Queues', userPayload);
        const sSQL = `SELECT * FROM vwQueues WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Queues', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }
  
    @FieldResolver(() => [QueueTask_])
    async QueueTasks(@Root() queue: Queue_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Queue Tasks', userPayload);
        const sSQL = `SELECT * FROM vwQueueTasks WHERE QueueID=${queue.ID} ` + this.getRowLevelSecurityWhereClause('Queue Tasks', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
    
    @Mutation(() => Queue_)
    async CreateQueue(
        @Arg('input', () => CreateQueueInput) input: CreateQueueInput,
        @Ctx() { dataSource, userPayload }: AppContext, 
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeCreate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Queues', this.GetUserFromPayload(userPayload));
            await entityObject.NewRecord();
            entityObject.SetMany(input);
            if (await entityObject.Save()) {
                // save worked, fire the AfterCreate event and then return all the data
                await this.AfterCreate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else 
                // save failed, return null
                return null;
        }
        else    
            return null;
    }

    // Before/After CREATE Event Hooks for Sub-Classes to Override
    protected async BeforeCreate(dataSource: DataSource, input: CreateQueueInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterCreate(dataSource: DataSource, input: CreateQueueInput) {
        const i = input, d = dataSource; // prevent error
    }
    
    @Mutation(() => Queue_)
    async UpdateQueue(
        @Arg('input', () => UpdateQueueInput) input: UpdateQueueInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Queues', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for Queues
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateQueueInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateQueueInput) {
        const i = input, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for Queue Tasks
//****************************************************************************
@ViewEntity({
   name: 'vwQueueTasks',
   synchronize: false,
})
@ObjectType()
export class QueueTask_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field(() => Int) 
    @Column()
    QueueID: number;
      
    @Field() 
    @MaxLength(20)
    @Column()
    Status: string;
      
    @Field({nullable: true}) 
    @MaxLength(8)
    @Column()
    StartedAt?: Date;
      
    @Field({nullable: true}) 
    @MaxLength(8)
    @Column()
    EndedAt?: Date;
      
    @Field({nullable: true}) 
    @Column()
    Data?: string;
      
    @Field({nullable: true}) 
    @Column()
    Options?: string;
      
    @Field({nullable: true}) 
    @Column()
    Output?: string;
      
    @Field({nullable: true}) 
    @Column()
    ErrorMessage?: string;
      
    @Field({nullable: true}) 
    @Column()
    Comments?: string;
    
}
        
//****************************************************************************
// INPUT TYPE for Queue Tasks   
//****************************************************************************
@InputType()
export class CreateQueueTaskInput {
    @Field(() => Int, )
    QueueID: number;

    @Field()
    Status: string;

    @Field({ nullable: true })
    StartedAt: Date;

    @Field({ nullable: true })
    EndedAt: Date;

    @Field({ nullable: true })
    Data: string;

    @Field({ nullable: true })
    Options: string;

    @Field({ nullable: true })
    Output: string;

    @Field({ nullable: true })
    ErrorMessage: string;

    @Field({ nullable: true })
    Comments: string;
}

        
//****************************************************************************
// INPUT TYPE for Queue Tasks   
//****************************************************************************
@InputType()
export class UpdateQueueTaskInput {
    @Field(() => Int, )
    ID: number;

    @Field(() => Int, )
    QueueID: number;

    @Field()
    Status: string;

    @Field({ nullable: true })
    StartedAt: Date;

    @Field({ nullable: true })
    EndedAt: Date;

    @Field({ nullable: true })
    Data: string;

    @Field({ nullable: true })
    Options: string;

    @Field({ nullable: true })
    Output: string;

    @Field({ nullable: true })
    ErrorMessage: string;

    @Field({ nullable: true })
    Comments: string;
}

//****************************************************************************
// RESOLVER for Queue Tasks
//****************************************************************************
@ObjectType()
export class RunQueueTaskViewResult {
    @Field(() => [QueueTask_])
    Results: QueueTask_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(QueueTask_)
export class QueueTaskResolver extends ResolverBase {
    @Query(() => RunQueueTaskViewResult)
    async RunQueueTaskViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunQueueTaskViewResult)
    async RunQueueTaskViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunQueueTaskViewResult)
    async RunQueueTaskDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Queue Tasks';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => QueueTask_, { nullable: true })
    async QueueTask(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<QueueTask_ | null> {
        this.CheckUserReadPermissions('Queue Tasks', userPayload);
        const sSQL = `SELECT * FROM vwQueueTasks WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Queue Tasks', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }

    @Mutation(() => QueueTask_)
    async CreateQueueTask(
        @Arg('input', () => CreateQueueTaskInput) input: CreateQueueTaskInput,
        @Ctx() { dataSource, userPayload }: AppContext, 
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeCreate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Queue Tasks', this.GetUserFromPayload(userPayload));
            await entityObject.NewRecord();
            entityObject.SetMany(input);
            if (await entityObject.Save()) {
                // save worked, fire the AfterCreate event and then return all the data
                await this.AfterCreate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else 
                // save failed, return null
                return null;
        }
        else    
            return null;
    }

    // Before/After CREATE Event Hooks for Sub-Classes to Override
    protected async BeforeCreate(dataSource: DataSource, input: CreateQueueTaskInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterCreate(dataSource: DataSource, input: CreateQueueTaskInput) {
        const i = input, d = dataSource; // prevent error
    }
    
    @Mutation(() => QueueTask_)
    async UpdateQueueTask(
        @Arg('input', () => UpdateQueueTaskInput) input: UpdateQueueTaskInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Queue Tasks', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for Queue Tasks
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateQueueTaskInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateQueueTaskInput) {
        const i = input, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for Dashboards
//****************************************************************************
@ViewEntity({
   name: 'vwDashboards',
   synchronize: false,
})
@ObjectType()
export class Dashboard_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field() 
    @MaxLength(510)
    @Column()
    Name: string;
      
    @Field({nullable: true}) 
    @Column()
    Description?: string;
      
    @Field() 
    @Column()
    UIConfigDetails: string;
      
    @Field(() => Int, {nullable: true}) 
    @Column()
    UserID?: number;
      
    @Field({nullable: true}) 
    @MaxLength(200)
    @ViewColumn()
    User?: string;
    
}
        
//****************************************************************************
// INPUT TYPE for Dashboards   
//****************************************************************************
@InputType()
export class CreateDashboardInput {
    @Field()
    Name: string;

    @Field({ nullable: true })
    Description: string;

    @Field()
    UIConfigDetails: string;

    @Field(() => Int, { nullable: true })
    UserID: number;
}

        
//****************************************************************************
// INPUT TYPE for Dashboards   
//****************************************************************************
@InputType()
export class UpdateDashboardInput {
    @Field(() => Int, )
    ID: number;

    @Field()
    Name: string;

    @Field({ nullable: true })
    Description: string;

    @Field()
    UIConfigDetails: string;

    @Field(() => Int, { nullable: true })
    UserID: number;
}

//****************************************************************************
// RESOLVER for Dashboards
//****************************************************************************
@ObjectType()
export class RunDashboardViewResult {
    @Field(() => [Dashboard_])
    Results: Dashboard_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(Dashboard_)
export class DashboardResolver extends ResolverBase {
    @Query(() => RunDashboardViewResult)
    async RunDashboardViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunDashboardViewResult)
    async RunDashboardViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunDashboardViewResult)
    async RunDashboardDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Dashboards';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => Dashboard_, { nullable: true })
    async Dashboard(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<Dashboard_ | null> {
        this.CheckUserReadPermissions('Dashboards', userPayload);
        const sSQL = `SELECT * FROM vwDashboards WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Dashboards', userPayload, EntityPermissionType.Read, 'AND');
        this.createRecordAccessAuditLogRecord(userPayload, 'Dashboards', ID)
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }

    @Mutation(() => Dashboard_)
    async CreateDashboard(
        @Arg('input', () => CreateDashboardInput) input: CreateDashboardInput,
        @Ctx() { dataSource, userPayload }: AppContext, 
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeCreate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Dashboards', this.GetUserFromPayload(userPayload));
            await entityObject.NewRecord();
            entityObject.SetMany(input);
            if (await entityObject.Save()) {
                // save worked, fire the AfterCreate event and then return all the data
                await this.AfterCreate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else 
                // save failed, return null
                return null;
        }
        else    
            return null;
    }

    // Before/After CREATE Event Hooks for Sub-Classes to Override
    protected async BeforeCreate(dataSource: DataSource, input: CreateDashboardInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterCreate(dataSource: DataSource, input: CreateDashboardInput) {
        const i = input, d = dataSource; // prevent error
    }
    
    @Mutation(() => Dashboard_)
    async UpdateDashboard(
        @Arg('input', () => UpdateDashboardInput) input: UpdateDashboardInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Dashboards', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for Dashboards
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateDashboardInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateDashboardInput) {
        const i = input, d = dataSource; // prevent error
    }

    @Mutation(() => Int)
    async DeleteDashboard(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        if (await this.BeforeDelete(dataSource, ID)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Dashboards', this.GetUserFromPayload(userPayload));
            await entityObject.Load(ID)
            if (await entityObject.Delete()) {
                await this.AfterDelete(dataSource, ID); // fire event
                return ID;
            }
            else 
                return null; // delete failed
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeDelete(dataSource: DataSource, ID: number): Promise<boolean> {
        const i = ID, d = dataSource; // prevent error;
        return true;
    }
    protected async AfterDelete(dataSource: DataSource, ID: number) {
        const i = ID, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for Output Trigger Types
//****************************************************************************
@ViewEntity({
   name: 'vwOutputTriggerTypes',
   synchronize: false,
})
@ObjectType()
export class OutputTriggerType_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field() 
    @MaxLength(510)
    @Column()
    Name: string;
      
    @Field({nullable: true}) 
    @Column()
    Description?: string;
    
    @Field(() => [Report_])
    @OneToMany(() => Report_, () => null)
    Reports: Report_[]; // Link to Reports

}
//****************************************************************************
// RESOLVER for Output Trigger Types
//****************************************************************************
@ObjectType()
export class RunOutputTriggerTypeViewResult {
    @Field(() => [OutputTriggerType_])
    Results: OutputTriggerType_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(OutputTriggerType_)
export class OutputTriggerTypeResolver extends ResolverBase {
    @Query(() => RunOutputTriggerTypeViewResult)
    async RunOutputTriggerTypeViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunOutputTriggerTypeViewResult)
    async RunOutputTriggerTypeViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunOutputTriggerTypeViewResult)
    async RunOutputTriggerTypeDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Output Trigger Types';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => OutputTriggerType_, { nullable: true })
    async OutputTriggerType(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<OutputTriggerType_ | null> {
        this.CheckUserReadPermissions('Output Trigger Types', userPayload);
        const sSQL = `SELECT * FROM vwOutputTriggerTypes WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Output Trigger Types', userPayload, EntityPermissionType.Read, 'AND');
        this.createRecordAccessAuditLogRecord(userPayload, 'Output Trigger Types', ID)
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }
  
    @FieldResolver(() => [Report_])
    async Reports(@Root() outputtriggertype: OutputTriggerType_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Reports', userPayload);
        const sSQL = `SELECT * FROM vwReports WHERE OutputTriggerTypeID=${outputtriggertype.ID} ` + this.getRowLevelSecurityWhereClause('Reports', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
    
}

//****************************************************************************
// ENTITY CLASS for Output Format Types
//****************************************************************************
@ViewEntity({
   name: 'vwOutputFormatTypes',
   synchronize: false,
})
@ObjectType()
export class OutputFormatType_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field() 
    @MaxLength(510)
    @Column()
    Name: string;
      
    @Field({nullable: true}) 
    @Column()
    Description?: string;
      
    @Field({nullable: true}) 
    @Column()
    DisplayFormat?: string;
    
    @Field(() => [Report_])
    @OneToMany(() => Report_, () => null)
    Reports: Report_[]; // Link to Reports

}
//****************************************************************************
// RESOLVER for Output Format Types
//****************************************************************************
@ObjectType()
export class RunOutputFormatTypeViewResult {
    @Field(() => [OutputFormatType_])
    Results: OutputFormatType_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(OutputFormatType_)
export class OutputFormatTypeResolver extends ResolverBase {
    @Query(() => RunOutputFormatTypeViewResult)
    async RunOutputFormatTypeViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunOutputFormatTypeViewResult)
    async RunOutputFormatTypeViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunOutputFormatTypeViewResult)
    async RunOutputFormatTypeDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Output Format Types';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => OutputFormatType_, { nullable: true })
    async OutputFormatType(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<OutputFormatType_ | null> {
        this.CheckUserReadPermissions('Output Format Types', userPayload);
        const sSQL = `SELECT * FROM vwOutputFormatTypes WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Output Format Types', userPayload, EntityPermissionType.Read, 'AND');
        this.createRecordAccessAuditLogRecord(userPayload, 'Output Format Types', ID)
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }
  
    @FieldResolver(() => [Report_])
    async Reports(@Root() outputformattype: OutputFormatType_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Reports', userPayload);
        const sSQL = `SELECT * FROM vwReports WHERE OutputFormatTypeID=${outputformattype.ID} ` + this.getRowLevelSecurityWhereClause('Reports', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
    
}

//****************************************************************************
// ENTITY CLASS for Output Delivery Types
//****************************************************************************
@ViewEntity({
   name: 'vwOutputDeliveryTypes',
   synchronize: false,
})
@ObjectType()
export class OutputDeliveryType_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field() 
    @MaxLength(510)
    @Column()
    Name: string;
      
    @Field({nullable: true}) 
    @Column()
    Description?: string;
    
    @Field(() => [Report_])
    @OneToMany(() => Report_, () => null)
    Reports: Report_[]; // Link to Reports

}
//****************************************************************************
// RESOLVER for Output Delivery Types
//****************************************************************************
@ObjectType()
export class RunOutputDeliveryTypeViewResult {
    @Field(() => [OutputDeliveryType_])
    Results: OutputDeliveryType_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(OutputDeliveryType_)
export class OutputDeliveryTypeResolver extends ResolverBase {
    @Query(() => RunOutputDeliveryTypeViewResult)
    async RunOutputDeliveryTypeViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunOutputDeliveryTypeViewResult)
    async RunOutputDeliveryTypeViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunOutputDeliveryTypeViewResult)
    async RunOutputDeliveryTypeDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Output Delivery Types';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => OutputDeliveryType_, { nullable: true })
    async OutputDeliveryType(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<OutputDeliveryType_ | null> {
        this.CheckUserReadPermissions('Output Delivery Types', userPayload);
        const sSQL = `SELECT * FROM vwOutputDeliveryTypes WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Output Delivery Types', userPayload, EntityPermissionType.Read, 'AND');
        this.createRecordAccessAuditLogRecord(userPayload, 'Output Delivery Types', ID)
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }
  
    @FieldResolver(() => [Report_])
    async Reports(@Root() outputdeliverytype: OutputDeliveryType_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Reports', userPayload);
        const sSQL = `SELECT * FROM vwReports WHERE OutputDeliveryTypeID=${outputdeliverytype.ID} ` + this.getRowLevelSecurityWhereClause('Reports', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
    
}

//****************************************************************************
// ENTITY CLASS for Reports
//****************************************************************************
@ViewEntity({
   name: 'vwReports',
   synchronize: false,
})
@ObjectType()
export class Report_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field() 
    @MaxLength(510)
    @Column()
    Name: string;
      
    @Field({nullable: true}) 
    @Column()
    Description?: string;
      
    @Field(() => Int) 
    @Column()
    UserID: number;
      
    @Field() 
    @MaxLength(40)
    @Column()
    SharingScope: string;
      
    @Field(() => Int, {nullable: true}) 
    @Column()
    ConversationID?: number;
      
    @Field(() => Int, {nullable: true}) 
    @Column()
    ConversationDetailID?: number;
      
    @Field({nullable: true}) 
    @Column()
    ReportSQL?: string;
      
    @Field({nullable: true}) 
    @Column()
    ReportConfiguration?: string;
      
    @Field(() => Int, {nullable: true}) 
    @Column()
    OutputTriggerTypeID?: number;
      
    @Field(() => Int, {nullable: true}) 
    @Column()
    OutputFormatTypeID?: number;
      
    @Field(() => Int, {nullable: true}) 
    @Column()
    OutputDeliveryTypeID?: number;
      
    @Field(() => Int, {nullable: true}) 
    @Column()
    OutputEventID?: number;
      
    @Field({nullable: true}) 
    @MaxLength(100)
    @Column()
    OutputFrequency?: string;
      
    @Field({nullable: true}) 
    @MaxLength(510)
    @Column()
    OutputTargetEmail?: string;
      
    @Field(() => Int, {nullable: true}) 
    @Column()
    OutputWorkflowID?: number;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
      
    @Field() 
    @MaxLength(8)
    @Column()
    UpdatedAt: Date;
      
    @Field() 
    @MaxLength(200)
    @ViewColumn()
    User: string;
      
    @Field({nullable: true}) 
    @MaxLength(200)
    @ViewColumn()
    Conversation?: string;
      
    @Field({nullable: true}) 
    @MaxLength(510)
    @ViewColumn()
    OutputTriggerType?: string;
      
    @Field({nullable: true}) 
    @MaxLength(510)
    @ViewColumn()
    OutputFormatType?: string;
      
    @Field({nullable: true}) 
    @MaxLength(510)
    @ViewColumn()
    OutputDeliveryType?: string;
      
    @Field({nullable: true}) 
    @MaxLength(510)
    @ViewColumn()
    OutputEvent?: string;
    
    @Field(() => [ReportSnapshot_])
    @OneToMany(() => ReportSnapshot_, () => null)
    ReportSnapshots: ReportSnapshot_[]; // Link to ReportSnapshots

}
        
//****************************************************************************
// INPUT TYPE for Reports   
//****************************************************************************
@InputType()
export class CreateReportInput {
    @Field()
    Name: string;

    @Field({ nullable: true })
    Description: string;

    @Field(() => Int, )
    UserID: number;

    @Field()
    SharingScope: string;

    @Field(() => Int, { nullable: true })
    ConversationID: number;

    @Field(() => Int, { nullable: true })
    ConversationDetailID: number;

    @Field({ nullable: true })
    ReportSQL: string;

    @Field({ nullable: true })
    ReportConfiguration: string;

    @Field(() => Int, { nullable: true })
    OutputTriggerTypeID: number;

    @Field(() => Int, { nullable: true })
    OutputFormatTypeID: number;

    @Field(() => Int, { nullable: true })
    OutputDeliveryTypeID: number;

    @Field(() => Int, { nullable: true })
    OutputEventID: number;

    @Field({ nullable: true })
    OutputFrequency: string;

    @Field({ nullable: true })
    OutputTargetEmail: string;

    @Field(() => Int, { nullable: true })
    OutputWorkflowID: number;
}

        
//****************************************************************************
// INPUT TYPE for Reports   
//****************************************************************************
@InputType()
export class UpdateReportInput {
    @Field(() => Int, )
    ID: number;

    @Field()
    Name: string;

    @Field({ nullable: true })
    Description: string;

    @Field(() => Int, )
    UserID: number;

    @Field()
    SharingScope: string;

    @Field(() => Int, { nullable: true })
    ConversationID: number;

    @Field(() => Int, { nullable: true })
    ConversationDetailID: number;

    @Field({ nullable: true })
    ReportSQL: string;

    @Field({ nullable: true })
    ReportConfiguration: string;

    @Field(() => Int, { nullable: true })
    OutputTriggerTypeID: number;

    @Field(() => Int, { nullable: true })
    OutputFormatTypeID: number;

    @Field(() => Int, { nullable: true })
    OutputDeliveryTypeID: number;

    @Field(() => Int, { nullable: true })
    OutputEventID: number;

    @Field({ nullable: true })
    OutputFrequency: string;

    @Field({ nullable: true })
    OutputTargetEmail: string;

    @Field(() => Int, { nullable: true })
    OutputWorkflowID: number;
}

//****************************************************************************
// RESOLVER for Reports
//****************************************************************************
@ObjectType()
export class RunReportViewResult {
    @Field(() => [Report_])
    Results: Report_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(Report_)
export class ReportResolver extends ResolverBase {
    @Query(() => RunReportViewResult)
    async RunReportViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunReportViewResult)
    async RunReportViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunReportViewResult)
    async RunReportDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Reports';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => Report_, { nullable: true })
    async Report(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<Report_ | null> {
        this.CheckUserReadPermissions('Reports', userPayload);
        const sSQL = `SELECT * FROM vwReports WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Reports', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }
  
    @FieldResolver(() => [ReportSnapshot_])
    async ReportSnapshots(@Root() report: Report_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Report Snapshots', userPayload);
        const sSQL = `SELECT * FROM vwReportSnapshots WHERE ReportID=${report.ID} ` + this.getRowLevelSecurityWhereClause('Report Snapshots', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
    
    @Mutation(() => Report_)
    async CreateReport(
        @Arg('input', () => CreateReportInput) input: CreateReportInput,
        @Ctx() { dataSource, userPayload }: AppContext, 
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeCreate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Reports', this.GetUserFromPayload(userPayload));
            await entityObject.NewRecord();
            entityObject.SetMany(input);
            if (await entityObject.Save()) {
                // save worked, fire the AfterCreate event and then return all the data
                await this.AfterCreate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else 
                // save failed, return null
                return null;
        }
        else    
            return null;
    }

    // Before/After CREATE Event Hooks for Sub-Classes to Override
    protected async BeforeCreate(dataSource: DataSource, input: CreateReportInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterCreate(dataSource: DataSource, input: CreateReportInput) {
        const i = input, d = dataSource; // prevent error
    }
    
    @Mutation(() => Report_)
    async UpdateReport(
        @Arg('input', () => UpdateReportInput) input: UpdateReportInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Reports', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for Reports
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateReportInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateReportInput) {
        const i = input, d = dataSource; // prevent error
    }

    @Mutation(() => Int)
    async DeleteReport(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        if (await this.BeforeDelete(dataSource, ID)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Reports', this.GetUserFromPayload(userPayload));
            await entityObject.Load(ID)
            if (await entityObject.Delete()) {
                await this.AfterDelete(dataSource, ID); // fire event
                return ID;
            }
            else 
                return null; // delete failed
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeDelete(dataSource: DataSource, ID: number): Promise<boolean> {
        const i = ID, d = dataSource; // prevent error;
        return true;
    }
    protected async AfterDelete(dataSource: DataSource, ID: number) {
        const i = ID, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for Report Snapshots
//****************************************************************************
@ViewEntity({
   name: 'vwReportSnapshots',
   synchronize: false,
})
@ObjectType()
export class ReportSnapshot_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field(() => Int) 
    @Column()
    ReportID: number;
      
    @Field() 
    @Column()
    ResultSet: string;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
      
    @Field(() => Int, {nullable: true}) 
    @Column()
    UserID?: number;
      
    @Field() 
    @MaxLength(510)
    @ViewColumn()
    Report: string;
      
    @Field({nullable: true}) 
    @MaxLength(200)
    @ViewColumn()
    User?: string;
    
}
        
//****************************************************************************
// INPUT TYPE for Report Snapshots   
//****************************************************************************
@InputType()
export class CreateReportSnapshotInput {
    @Field(() => Int, )
    ReportID: number;

    @Field()
    ResultSet: string;

    @Field(() => Int, { nullable: true })
    UserID: number;
}

        
//****************************************************************************
// INPUT TYPE for Report Snapshots   
//****************************************************************************
@InputType()
export class UpdateReportSnapshotInput {
    @Field(() => Int, )
    ID: number;

    @Field(() => Int, )
    ReportID: number;

    @Field()
    ResultSet: string;

    @Field(() => Int, { nullable: true })
    UserID: number;
}

//****************************************************************************
// RESOLVER for Report Snapshots
//****************************************************************************
@ObjectType()
export class RunReportSnapshotViewResult {
    @Field(() => [ReportSnapshot_])
    Results: ReportSnapshot_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(ReportSnapshot_)
export class ReportSnapshotResolver extends ResolverBase {
    @Query(() => RunReportSnapshotViewResult)
    async RunReportSnapshotViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunReportSnapshotViewResult)
    async RunReportSnapshotViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunReportSnapshotViewResult)
    async RunReportSnapshotDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Report Snapshots';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => ReportSnapshot_, { nullable: true })
    async ReportSnapshot(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<ReportSnapshot_ | null> {
        this.CheckUserReadPermissions('Report Snapshots', userPayload);
        const sSQL = `SELECT * FROM vwReportSnapshots WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Report Snapshots', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }

    @Mutation(() => ReportSnapshot_)
    async CreateReportSnapshot(
        @Arg('input', () => CreateReportSnapshotInput) input: CreateReportSnapshotInput,
        @Ctx() { dataSource, userPayload }: AppContext, 
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeCreate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Report Snapshots', this.GetUserFromPayload(userPayload));
            await entityObject.NewRecord();
            entityObject.SetMany(input);
            if (await entityObject.Save()) {
                // save worked, fire the AfterCreate event and then return all the data
                await this.AfterCreate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else 
                // save failed, return null
                return null;
        }
        else    
            return null;
    }

    // Before/After CREATE Event Hooks for Sub-Classes to Override
    protected async BeforeCreate(dataSource: DataSource, input: CreateReportSnapshotInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterCreate(dataSource: DataSource, input: CreateReportSnapshotInput) {
        const i = input, d = dataSource; // prevent error
    }
    
    @Mutation(() => ReportSnapshot_)
    async UpdateReportSnapshot(
        @Arg('input', () => UpdateReportSnapshotInput) input: UpdateReportSnapshotInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Report Snapshots', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for Report Snapshots
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateReportSnapshotInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateReportSnapshotInput) {
        const i = input, d = dataSource; // prevent error
    }

    @Mutation(() => Int)
    async DeleteReportSnapshot(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        if (await this.BeforeDelete(dataSource, ID)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Report Snapshots', this.GetUserFromPayload(userPayload));
            await entityObject.Load(ID)
            if (await entityObject.Delete()) {
                await this.AfterDelete(dataSource, ID); // fire event
                return ID;
            }
            else 
                return null; // delete failed
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeDelete(dataSource: DataSource, ID: number): Promise<boolean> {
        const i = ID, d = dataSource; // prevent error;
        return true;
    }
    protected async AfterDelete(dataSource: DataSource, ID: number) {
        const i = ID, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for Resource Types
//****************************************************************************
@ViewEntity({
   name: 'vwResourceTypes',
   synchronize: false,
})
@ObjectType()
export class ResourceType_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field() 
    @MaxLength(510)
    @Column()
    Name: string;
      
    @Field() 
    @MaxLength(510)
    @Column()
    DisplayName: string;
      
    @Field({nullable: true}) 
    @Column()
    Description?: string;
      
    @Field({nullable: true}) 
    @MaxLength(200)
    @Column()
    Icon?: string;
      
    @Field(() => Int, {nullable: true}) 
    @Column()
    EntityID?: number;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
      
    @Field() 
    @MaxLength(8)
    @Column()
    UpdatedAt: Date;
      
    @Field({nullable: true}) 
    @MaxLength(100)
    @ViewColumn()
    Entity?: string;
    
    @Field(() => [WorkspaceItem_])
    @OneToMany(() => WorkspaceItem_, () => null)
    WorkspaceItems: WorkspaceItem_[]; // Link to WorkspaceItems

    @Field(() => [ResourceFolder_])
    @OneToMany(() => ResourceFolder_, () => null)
    ResourceFolders: ResourceFolder_[]; // Link to ResourceFolders

}
//****************************************************************************
// RESOLVER for Resource Types
//****************************************************************************
@ObjectType()
export class RunResourceTypeViewResult {
    @Field(() => [ResourceType_])
    Results: ResourceType_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(ResourceType_)
export class ResourceTypeResolver extends ResolverBase {
    @Query(() => RunResourceTypeViewResult)
    async RunResourceTypeViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunResourceTypeViewResult)
    async RunResourceTypeViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunResourceTypeViewResult)
    async RunResourceTypeDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Resource Types';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => ResourceType_, { nullable: true })
    async ResourceType(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<ResourceType_ | null> {
        this.CheckUserReadPermissions('Resource Types', userPayload);
        const sSQL = `SELECT * FROM vwResourceTypes WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Resource Types', userPayload, EntityPermissionType.Read, 'AND');
        this.createRecordAccessAuditLogRecord(userPayload, 'Resource Types', ID)
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }
  
    @FieldResolver(() => [WorkspaceItem_])
    async WorkspaceItems(@Root() resourcetype: ResourceType_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Workspace Items', userPayload);
        const sSQL = `SELECT * FROM vwWorkspaceItems WHERE ResourceTypeID=${resourcetype.ID} ` + this.getRowLevelSecurityWhereClause('Workspace Items', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [ResourceFolder_])
    async ResourceFolders(@Root() resourcetype: ResourceType_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Resource Folders', userPayload);
        const sSQL = `SELECT * FROM vwResourceFolders WHERE ResourceTypeName=${resourcetype.ID} ` + this.getRowLevelSecurityWhereClause('Resource Folders', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
    
}

//****************************************************************************
// ENTITY CLASS for Tags
//****************************************************************************
@ViewEntity({
   name: 'vwTags',
   synchronize: false,
})
@ObjectType()
export class Tag_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field() 
    @MaxLength(510)
    @Column()
    Name: string;
      
    @Field() 
    @MaxLength(510)
    @Column()
    DisplayName: string;
      
    @Field({nullable: true}) 
    @Column()
    Description?: string;
      
    @Field(() => Int, {nullable: true}) 
    @Column()
    ParentID?: number;
      
    @Field({nullable: true}) 
    @MaxLength(510)
    @ViewColumn()
    Parent?: string;
    
    @Field(() => [Tag_])
    @OneToMany(() => Tag_, () => null)
    Tags: Tag_[]; // Link to Tags

    @Field(() => [TaggedItem_])
    @OneToMany(() => TaggedItem_, () => null)
    TaggedItems: TaggedItem_[]; // Link to TaggedItems

}
//****************************************************************************
// RESOLVER for Tags
//****************************************************************************
@ObjectType()
export class RunTagViewResult {
    @Field(() => [Tag_])
    Results: Tag_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(Tag_)
export class TagResolver extends ResolverBase {
    @Query(() => RunTagViewResult)
    async RunTagViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunTagViewResult)
    async RunTagViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunTagViewResult)
    async RunTagDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Tags';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => Tag_, { nullable: true })
    async Tag(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<Tag_ | null> {
        this.CheckUserReadPermissions('Tags', userPayload);
        const sSQL = `SELECT * FROM vwTags WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Tags', userPayload, EntityPermissionType.Read, 'AND');
        this.createRecordAccessAuditLogRecord(userPayload, 'Tags', ID)
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }
  
    @FieldResolver(() => [Tag_])
    async Tags(@Root() tag: Tag_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Tags', userPayload);
        const sSQL = `SELECT * FROM vwTags WHERE ParentID=${tag.ID} ` + this.getRowLevelSecurityWhereClause('Tags', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [TaggedItem_])
    async TaggedItems(@Root() tag: Tag_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Tagged Items', userPayload);
        const sSQL = `SELECT * FROM vwTaggedItems WHERE TagID=${tag.ID} ` + this.getRowLevelSecurityWhereClause('Tagged Items', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
    
}

//****************************************************************************
// ENTITY CLASS for Tagged Items
//****************************************************************************
@ViewEntity({
   name: 'vwTaggedItems',
   synchronize: false,
})
@ObjectType()
export class TaggedItem_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field(() => Int) 
    @Column()
    TagID: number;
      
    @Field(() => Int) 
    @Column()
    EntityID: number;
      
    @Field(() => Int) 
    @Column()
    RecordID: number;
      
    @Field() 
    @MaxLength(510)
    @ViewColumn()
    Tag: string;
      
    @Field() 
    @MaxLength(100)
    @ViewColumn()
    Entity: string;
    
}
//****************************************************************************
// RESOLVER for Tagged Items
//****************************************************************************
@ObjectType()
export class RunTaggedItemViewResult {
    @Field(() => [TaggedItem_])
    Results: TaggedItem_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(TaggedItem_)
export class TaggedItemResolver extends ResolverBase {
    @Query(() => RunTaggedItemViewResult)
    async RunTaggedItemViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunTaggedItemViewResult)
    async RunTaggedItemViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunTaggedItemViewResult)
    async RunTaggedItemDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Tagged Items';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => TaggedItem_, { nullable: true })
    async TaggedItem(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<TaggedItem_ | null> {
        this.CheckUserReadPermissions('Tagged Items', userPayload);
        const sSQL = `SELECT * FROM vwTaggedItems WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Tagged Items', userPayload, EntityPermissionType.Read, 'AND');
        this.createRecordAccessAuditLogRecord(userPayload, 'Tagged Items', ID)
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }

}

//****************************************************************************
// ENTITY CLASS for Workspaces
//****************************************************************************
@ViewEntity({
   name: 'vwWorkspaces',
   synchronize: false,
})
@ObjectType()
export class Workspace_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field() 
    @MaxLength(510)
    @Column()
    Name: string;
      
    @Field({nullable: true}) 
    @Column()
    Description?: string;
      
    @Field(() => Int) 
    @Column()
    UserID: number;
      
    @Field() 
    @MaxLength(200)
    @ViewColumn()
    User: string;
    
    @Field(() => [WorkspaceItem_])
    @OneToMany(() => WorkspaceItem_, () => null)
    WorkspaceItems: WorkspaceItem_[]; // Link to WorkspaceItems

}
        
//****************************************************************************
// INPUT TYPE for Workspaces   
//****************************************************************************
@InputType()
export class CreateWorkspaceInput {
    @Field()
    Name: string;

    @Field({ nullable: true })
    Description: string;

    @Field(() => Int, )
    UserID: number;
}

        
//****************************************************************************
// INPUT TYPE for Workspaces   
//****************************************************************************
@InputType()
export class UpdateWorkspaceInput {
    @Field(() => Int, )
    ID: number;

    @Field()
    Name: string;

    @Field({ nullable: true })
    Description: string;

    @Field(() => Int, )
    UserID: number;
}

//****************************************************************************
// RESOLVER for Workspaces
//****************************************************************************
@ObjectType()
export class RunWorkspaceViewResult {
    @Field(() => [Workspace_])
    Results: Workspace_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(Workspace_)
export class WorkspaceResolver extends ResolverBase {
    @Query(() => RunWorkspaceViewResult)
    async RunWorkspaceViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunWorkspaceViewResult)
    async RunWorkspaceViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunWorkspaceViewResult)
    async RunWorkspaceDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Workspaces';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => Workspace_, { nullable: true })
    async Workspace(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<Workspace_ | null> {
        this.CheckUserReadPermissions('Workspaces', userPayload);
        const sSQL = `SELECT * FROM vwWorkspaces WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Workspaces', userPayload, EntityPermissionType.Read, 'AND');
        this.createRecordAccessAuditLogRecord(userPayload, 'Workspaces', ID)
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }
  
    @FieldResolver(() => [WorkspaceItem_])
    async WorkspaceItems(@Root() workspace: Workspace_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Workspace Items', userPayload);
        const sSQL = `SELECT * FROM vwWorkspaceItems WHERE WorkSpaceID=${workspace.ID} ` + this.getRowLevelSecurityWhereClause('Workspace Items', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
    
    @Mutation(() => Workspace_)
    async CreateWorkspace(
        @Arg('input', () => CreateWorkspaceInput) input: CreateWorkspaceInput,
        @Ctx() { dataSource, userPayload }: AppContext, 
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeCreate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Workspaces', this.GetUserFromPayload(userPayload));
            await entityObject.NewRecord();
            entityObject.SetMany(input);
            if (await entityObject.Save()) {
                // save worked, fire the AfterCreate event and then return all the data
                await this.AfterCreate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else 
                // save failed, return null
                return null;
        }
        else    
            return null;
    }

    // Before/After CREATE Event Hooks for Sub-Classes to Override
    protected async BeforeCreate(dataSource: DataSource, input: CreateWorkspaceInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterCreate(dataSource: DataSource, input: CreateWorkspaceInput) {
        const i = input, d = dataSource; // prevent error
    }
    
    @Mutation(() => Workspace_)
    async UpdateWorkspace(
        @Arg('input', () => UpdateWorkspaceInput) input: UpdateWorkspaceInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Workspaces', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for Workspaces
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateWorkspaceInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateWorkspaceInput) {
        const i = input, d = dataSource; // prevent error
    }

    @Mutation(() => Int)
    async DeleteWorkspace(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        if (await this.BeforeDelete(dataSource, ID)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Workspaces', this.GetUserFromPayload(userPayload));
            await entityObject.Load(ID)
            if (await entityObject.Delete()) {
                await this.AfterDelete(dataSource, ID); // fire event
                return ID;
            }
            else 
                return null; // delete failed
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeDelete(dataSource: DataSource, ID: number): Promise<boolean> {
        const i = ID, d = dataSource; // prevent error;
        return true;
    }
    protected async AfterDelete(dataSource: DataSource, ID: number) {
        const i = ID, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for Workspace Items
//****************************************************************************
@ViewEntity({
   name: 'vwWorkspaceItems',
   synchronize: false,
})
@ObjectType()
export class WorkspaceItem_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field() 
    @MaxLength(510)
    @Column()
    Name: string;
      
    @Field({nullable: true}) 
    @Column()
    Description?: string;
      
    @Field(() => Int) 
    @Column()
    WorkSpaceID: number;
      
    @Field(() => Int) 
    @Column()
    ResourceTypeID: number;
      
    @Field(() => Int, {nullable: true}) 
    @Column()
    ResourceRecordID?: number;
      
    @Field(() => Int) 
    @Column()
    Sequence: number;
      
    @Field({nullable: true}) 
    @Column()
    Configuration?: string;
      
    @Field() 
    @MaxLength(510)
    @ViewColumn()
    WorkSpace: string;
      
    @Field() 
    @MaxLength(510)
    @ViewColumn()
    ResourceType: string;
    
}
        
//****************************************************************************
// INPUT TYPE for Workspace Items   
//****************************************************************************
@InputType()
export class CreateWorkspaceItemInput {
    @Field()
    Name: string;

    @Field({ nullable: true })
    Description: string;

    @Field(() => Int, )
    WorkSpaceID: number;

    @Field(() => Int, )
    ResourceTypeID: number;

    @Field(() => Int, { nullable: true })
    ResourceRecordID: number;

    @Field(() => Int, )
    Sequence: number;

    @Field({ nullable: true })
    Configuration: string;
}

        
//****************************************************************************
// INPUT TYPE for Workspace Items   
//****************************************************************************
@InputType()
export class UpdateWorkspaceItemInput {
    @Field(() => Int, )
    ID: number;

    @Field()
    Name: string;

    @Field({ nullable: true })
    Description: string;

    @Field(() => Int, )
    WorkSpaceID: number;

    @Field(() => Int, )
    ResourceTypeID: number;

    @Field(() => Int, { nullable: true })
    ResourceRecordID: number;

    @Field(() => Int, )
    Sequence: number;

    @Field({ nullable: true })
    Configuration: string;
}

//****************************************************************************
// RESOLVER for Workspace Items
//****************************************************************************
@ObjectType()
export class RunWorkspaceItemViewResult {
    @Field(() => [WorkspaceItem_])
    Results: WorkspaceItem_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(WorkspaceItem_)
export class WorkspaceItemResolver extends ResolverBase {
    @Query(() => RunWorkspaceItemViewResult)
    async RunWorkspaceItemViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunWorkspaceItemViewResult)
    async RunWorkspaceItemViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunWorkspaceItemViewResult)
    async RunWorkspaceItemDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Workspace Items';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => WorkspaceItem_, { nullable: true })
    async WorkspaceItem(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<WorkspaceItem_ | null> {
        this.CheckUserReadPermissions('Workspace Items', userPayload);
        const sSQL = `SELECT * FROM vwWorkspaceItems WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Workspace Items', userPayload, EntityPermissionType.Read, 'AND');
        this.createRecordAccessAuditLogRecord(userPayload, 'Workspace Items', ID)
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }

    @Mutation(() => WorkspaceItem_)
    async CreateWorkspaceItem(
        @Arg('input', () => CreateWorkspaceItemInput) input: CreateWorkspaceItemInput,
        @Ctx() { dataSource, userPayload }: AppContext, 
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeCreate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Workspace Items', this.GetUserFromPayload(userPayload));
            await entityObject.NewRecord();
            entityObject.SetMany(input);
            if (await entityObject.Save()) {
                // save worked, fire the AfterCreate event and then return all the data
                await this.AfterCreate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else 
                // save failed, return null
                return null;
        }
        else    
            return null;
    }

    // Before/After CREATE Event Hooks for Sub-Classes to Override
    protected async BeforeCreate(dataSource: DataSource, input: CreateWorkspaceItemInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterCreate(dataSource: DataSource, input: CreateWorkspaceItemInput) {
        const i = input, d = dataSource; // prevent error
    }
    
    @Mutation(() => WorkspaceItem_)
    async UpdateWorkspaceItem(
        @Arg('input', () => UpdateWorkspaceItemInput) input: UpdateWorkspaceItemInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Workspace Items', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for Workspace Items
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateWorkspaceItemInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateWorkspaceItemInput) {
        const i = input, d = dataSource; // prevent error
    }

    @Mutation(() => Int)
    async DeleteWorkspaceItem(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        if (await this.BeforeDelete(dataSource, ID)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Workspace Items', this.GetUserFromPayload(userPayload));
            await entityObject.Load(ID)
            if (await entityObject.Delete()) {
                await this.AfterDelete(dataSource, ID); // fire event
                return ID;
            }
            else 
                return null; // delete failed
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeDelete(dataSource: DataSource, ID: number): Promise<boolean> {
        const i = ID, d = dataSource; // prevent error;
        return true;
    }
    protected async AfterDelete(dataSource: DataSource, ID: number) {
        const i = ID, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for Datasets
//****************************************************************************
@ViewEntity({
   name: 'vwDatasets',
   synchronize: false,
})
@ObjectType()
export class Dataset_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field() 
    @MaxLength(100)
    @Column()
    Name: string;
      
    @Field({nullable: true}) 
    @Column()
    Description?: string;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
      
    @Field() 
    @MaxLength(8)
    @Column()
    UpdatedAt: Date;
    
    @Field(() => [DatasetItem_])
    @OneToMany(() => DatasetItem_, () => null)
    DatasetItems: DatasetItem_[]; // Link to DatasetItems

}
//****************************************************************************
// RESOLVER for Datasets
//****************************************************************************
@ObjectType()
export class RunDatasetViewResult {
    @Field(() => [Dataset_])
    Results: Dataset_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(Dataset_)
export class DatasetResolver extends ResolverBase {
    @Query(() => RunDatasetViewResult)
    async RunDatasetViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunDatasetViewResult)
    async RunDatasetViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunDatasetViewResult)
    async RunDatasetDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Datasets';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => Dataset_, { nullable: true })
    async Dataset(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<Dataset_ | null> {
        this.CheckUserReadPermissions('Datasets', userPayload);
        const sSQL = `SELECT * FROM vwDatasets WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Datasets', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }
  
    @FieldResolver(() => [DatasetItem_])
    async DatasetItems(@Root() dataset: Dataset_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Dataset Items', userPayload);
        const sSQL = `SELECT * FROM vwDatasetItems WHERE DatasetName=${dataset.ID} ` + this.getRowLevelSecurityWhereClause('Dataset Items', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
    
}

//****************************************************************************
// ENTITY CLASS for Dataset Items
//****************************************************************************
@ViewEntity({
   name: 'vwDatasetItems',
   synchronize: false,
})
@ObjectType()
export class DatasetItem_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field() 
    @MaxLength(100)
    @Column()
    Code: string;
      
    @Field({nullable: true}) 
    @MaxLength(100)
    @Column()
    DatasetName?: string;
      
    @Field(() => Int) 
    @Column()
    Sequence: number;
      
    @Field(() => Int) 
    @Column()
    EntityID: number;
      
    @Field({nullable: true}) 
    @Column()
    WhereClause?: string;
      
    @Field() 
    @MaxLength(200)
    @Column()
    DateFieldToCheck: string;
      
    @Field({nullable: true}) 
    @Column()
    Description?: string;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
      
    @Field() 
    @MaxLength(8)
    @Column()
    UpdatedAt: Date;
      
    @Field() 
    @MaxLength(100)
    @ViewColumn()
    Entity: string;
    
}
//****************************************************************************
// RESOLVER for Dataset Items
//****************************************************************************
@ObjectType()
export class RunDatasetItemViewResult {
    @Field(() => [DatasetItem_])
    Results: DatasetItem_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(DatasetItem_)
export class DatasetItemResolver extends ResolverBase {
    @Query(() => RunDatasetItemViewResult)
    async RunDatasetItemViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunDatasetItemViewResult)
    async RunDatasetItemViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunDatasetItemViewResult)
    async RunDatasetItemDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Dataset Items';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => DatasetItem_, { nullable: true })
    async DatasetItem(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<DatasetItem_ | null> {
        this.CheckUserReadPermissions('Dataset Items', userPayload);
        const sSQL = `SELECT * FROM vwDatasetItems WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Dataset Items', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }

}

//****************************************************************************
// ENTITY CLASS for Conversation Details
//****************************************************************************
@ViewEntity({
   name: 'vwConversationDetails',
   synchronize: false,
})
@ObjectType()
export class ConversationDetail_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field(() => Int) 
    @Column()
    ConversationID: number;
      
    @Field({nullable: true}) 
    @MaxLength(200)
    @Column()
    ExternalID?: string;
      
    @Field() 
    @MaxLength(40)
    @Column()
    Role: string;
      
    @Field() 
    @Column()
    Message: string;
      
    @Field({nullable: true}) 
    @Column()
    Error?: string;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
      
    @Field() 
    @MaxLength(8)
    @Column()
    UpdatedAt: Date;
      
    @Field({nullable: true}) 
    @MaxLength(200)
    @ViewColumn()
    Conversation?: string;
    
    @Field(() => [Report_])
    @OneToMany(() => Report_, () => null)
    Reports: Report_[]; // Link to Reports

}
        
//****************************************************************************
// INPUT TYPE for Conversation Details   
//****************************************************************************
@InputType()
export class CreateConversationDetailInput {
    @Field(() => Int, )
    ConversationID: number;

    @Field({ nullable: true })
    ExternalID: string;

    @Field()
    Role: string;

    @Field()
    Message: string;

    @Field({ nullable: true })
    Error: string;
}

        
//****************************************************************************
// INPUT TYPE for Conversation Details   
//****************************************************************************
@InputType()
export class UpdateConversationDetailInput {
    @Field(() => Int, )
    ID: number;

    @Field(() => Int, )
    ConversationID: number;

    @Field({ nullable: true })
    ExternalID: string;

    @Field()
    Role: string;

    @Field()
    Message: string;

    @Field({ nullable: true })
    Error: string;
}

//****************************************************************************
// RESOLVER for Conversation Details
//****************************************************************************
@ObjectType()
export class RunConversationDetailViewResult {
    @Field(() => [ConversationDetail_])
    Results: ConversationDetail_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(ConversationDetail_)
export class ConversationDetailResolver extends ResolverBase {
    @Query(() => RunConversationDetailViewResult)
    async RunConversationDetailViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunConversationDetailViewResult)
    async RunConversationDetailViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunConversationDetailViewResult)
    async RunConversationDetailDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Conversation Details';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => ConversationDetail_, { nullable: true })
    async ConversationDetail(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<ConversationDetail_ | null> {
        this.CheckUserReadPermissions('Conversation Details', userPayload);
        const sSQL = `SELECT * FROM vwConversationDetails WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Conversation Details', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }
  
    @FieldResolver(() => [Report_])
    async Reports(@Root() conversationdetail: ConversationDetail_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Reports', userPayload);
        const sSQL = `SELECT * FROM vwReports WHERE ConversationDetailID=${conversationdetail.ID} ` + this.getRowLevelSecurityWhereClause('Reports', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
    
    @Mutation(() => ConversationDetail_)
    async CreateConversationDetail(
        @Arg('input', () => CreateConversationDetailInput) input: CreateConversationDetailInput,
        @Ctx() { dataSource, userPayload }: AppContext, 
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeCreate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Conversation Details', this.GetUserFromPayload(userPayload));
            await entityObject.NewRecord();
            entityObject.SetMany(input);
            if (await entityObject.Save()) {
                // save worked, fire the AfterCreate event and then return all the data
                await this.AfterCreate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else 
                // save failed, return null
                return null;
        }
        else    
            return null;
    }

    // Before/After CREATE Event Hooks for Sub-Classes to Override
    protected async BeforeCreate(dataSource: DataSource, input: CreateConversationDetailInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterCreate(dataSource: DataSource, input: CreateConversationDetailInput) {
        const i = input, d = dataSource; // prevent error
    }
    
    @Mutation(() => ConversationDetail_)
    async UpdateConversationDetail(
        @Arg('input', () => UpdateConversationDetailInput) input: UpdateConversationDetailInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Conversation Details', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for Conversation Details
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateConversationDetailInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateConversationDetailInput) {
        const i = input, d = dataSource; // prevent error
    }

    @Mutation(() => Int)
    async DeleteConversationDetail(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        if (await this.BeforeDelete(dataSource, ID)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Conversation Details', this.GetUserFromPayload(userPayload));
            await entityObject.Load(ID)
            if (await entityObject.Delete()) {
                await this.AfterDelete(dataSource, ID); // fire event
                return ID;
            }
            else 
                return null; // delete failed
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeDelete(dataSource: DataSource, ID: number): Promise<boolean> {
        const i = ID, d = dataSource; // prevent error;
        return true;
    }
    protected async AfterDelete(dataSource: DataSource, ID: number) {
        const i = ID, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for Conversations
//****************************************************************************
@ViewEntity({
   name: 'vwConversations',
   synchronize: false,
})
@ObjectType()
export class Conversation_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field(() => Int) 
    @Column()
    UserID: number;
      
    @Field({nullable: true}) 
    @MaxLength(200)
    @Column()
    ExternalID?: string;
      
    @Field({nullable: true}) 
    @MaxLength(200)
    @Column()
    Name?: string;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
      
    @Field() 
    @MaxLength(8)
    @Column()
    UpdatedAt: Date;
      
    @Field() 
    @MaxLength(200)
    @ViewColumn()
    User: string;
    
    @Field(() => [ConversationDetail_])
    @OneToMany(() => ConversationDetail_, () => null)
    ConversationDetails: ConversationDetail_[]; // Link to ConversationDetails

    @Field(() => [Report_])
    @OneToMany(() => Report_, () => null)
    Reports: Report_[]; // Link to Reports

}
        
//****************************************************************************
// INPUT TYPE for Conversations   
//****************************************************************************
@InputType()
export class CreateConversationInput {
    @Field(() => Int, )
    UserID: number;

    @Field({ nullable: true })
    ExternalID: string;

    @Field({ nullable: true })
    Name: string;
}

        
//****************************************************************************
// INPUT TYPE for Conversations   
//****************************************************************************
@InputType()
export class UpdateConversationInput {
    @Field(() => Int, )
    ID: number;

    @Field(() => Int, )
    UserID: number;

    @Field({ nullable: true })
    ExternalID: string;

    @Field({ nullable: true })
    Name: string;
}

//****************************************************************************
// RESOLVER for Conversations
//****************************************************************************
@ObjectType()
export class RunConversationViewResult {
    @Field(() => [Conversation_])
    Results: Conversation_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(Conversation_)
export class ConversationResolver extends ResolverBase {
    @Query(() => RunConversationViewResult)
    async RunConversationViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunConversationViewResult)
    async RunConversationViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunConversationViewResult)
    async RunConversationDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Conversations';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => Conversation_, { nullable: true })
    async Conversation(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<Conversation_ | null> {
        this.CheckUserReadPermissions('Conversations', userPayload);
        const sSQL = `SELECT * FROM vwConversations WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Conversations', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }
  
    @FieldResolver(() => [ConversationDetail_])
    async ConversationDetails(@Root() conversation: Conversation_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Conversation Details', userPayload);
        const sSQL = `SELECT * FROM vwConversationDetails WHERE ConversationID=${conversation.ID} ` + this.getRowLevelSecurityWhereClause('Conversation Details', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [Report_])
    async Reports(@Root() conversation: Conversation_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Reports', userPayload);
        const sSQL = `SELECT * FROM vwReports WHERE ConversationID=${conversation.ID} ` + this.getRowLevelSecurityWhereClause('Reports', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
    
    @Mutation(() => Conversation_)
    async CreateConversation(
        @Arg('input', () => CreateConversationInput) input: CreateConversationInput,
        @Ctx() { dataSource, userPayload }: AppContext, 
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeCreate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Conversations', this.GetUserFromPayload(userPayload));
            await entityObject.NewRecord();
            entityObject.SetMany(input);
            if (await entityObject.Save()) {
                // save worked, fire the AfterCreate event and then return all the data
                await this.AfterCreate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else 
                // save failed, return null
                return null;
        }
        else    
            return null;
    }

    // Before/After CREATE Event Hooks for Sub-Classes to Override
    protected async BeforeCreate(dataSource: DataSource, input: CreateConversationInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterCreate(dataSource: DataSource, input: CreateConversationInput) {
        const i = input, d = dataSource; // prevent error
    }
    
    @Mutation(() => Conversation_)
    async UpdateConversation(
        @Arg('input', () => UpdateConversationInput) input: UpdateConversationInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Conversations', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for Conversations
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateConversationInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateConversationInput) {
        const i = input, d = dataSource; // prevent error
    }

    @Mutation(() => Int)
    async DeleteConversation(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        if (await this.BeforeDelete(dataSource, ID)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Conversations', this.GetUserFromPayload(userPayload));
            await entityObject.Load(ID)
            if (await entityObject.Delete()) {
                await this.AfterDelete(dataSource, ID); // fire event
                return ID;
            }
            else 
                return null; // delete failed
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeDelete(dataSource: DataSource, ID: number): Promise<boolean> {
        const i = ID, d = dataSource; // prevent error;
        return true;
    }
    protected async AfterDelete(dataSource: DataSource, ID: number) {
        const i = ID, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for User Notifications
//****************************************************************************
@ViewEntity({
   name: 'vwUserNotifications',
   synchronize: false,
})
@ObjectType()
export class UserNotification_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field(() => Int) 
    @Column()
    UserID: number;
      
    @Field({nullable: true}) 
    @MaxLength(510)
    @Column()
    Title?: string;
      
    @Field({nullable: true}) 
    @Column()
    Message?: string;
      
    @Field(() => Int, {nullable: true}) 
    @Column()
    ResourceTypeID?: number;
      
    @Field(() => Int, {nullable: true}) 
    @Column()
    ResourceRecordID?: number;
      
    @Field({nullable: true}) 
    @Column()
    ResourceConfiguration?: string;
      
    @Field(() => Boolean) 
    @Column()
    Unread: boolean;
      
    @Field({nullable: true}) 
    @MaxLength(8)
    @Column()
    ReadAt?: Date;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
      
    @Field() 
    @MaxLength(8)
    @Column()
    UpdatedAt: Date;
      
    @Field() 
    @MaxLength(200)
    @ViewColumn()
    User: string;
    
}
        
//****************************************************************************
// INPUT TYPE for User Notifications   
//****************************************************************************
@InputType()
export class CreateUserNotificationInput {
    @Field(() => Int, )
    UserID: number;

    @Field({ nullable: true })
    Title: string;

    @Field({ nullable: true })
    Message: string;

    @Field(() => Int, { nullable: true })
    ResourceTypeID: number;

    @Field(() => Int, { nullable: true })
    ResourceRecordID: number;

    @Field({ nullable: true })
    ResourceConfiguration: string;

    @Field(() => Boolean, )
    Unread: boolean;

    @Field({ nullable: true })
    ReadAt: Date;
}

        
//****************************************************************************
// INPUT TYPE for User Notifications   
//****************************************************************************
@InputType()
export class UpdateUserNotificationInput {
    @Field(() => Int, )
    ID: number;

    @Field(() => Int, )
    UserID: number;

    @Field({ nullable: true })
    Title: string;

    @Field({ nullable: true })
    Message: string;

    @Field(() => Int, { nullable: true })
    ResourceTypeID: number;

    @Field(() => Int, { nullable: true })
    ResourceRecordID: number;

    @Field({ nullable: true })
    ResourceConfiguration: string;

    @Field(() => Boolean, )
    Unread: boolean;

    @Field({ nullable: true })
    ReadAt: Date;
}

//****************************************************************************
// RESOLVER for User Notifications
//****************************************************************************
@ObjectType()
export class RunUserNotificationViewResult {
    @Field(() => [UserNotification_])
    Results: UserNotification_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(UserNotification_)
export class UserNotificationResolver extends ResolverBase {
    @Query(() => RunUserNotificationViewResult)
    async RunUserNotificationViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunUserNotificationViewResult)
    async RunUserNotificationViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunUserNotificationViewResult)
    async RunUserNotificationDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'User Notifications';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => UserNotification_, { nullable: true })
    async UserNotification(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<UserNotification_ | null> {
        this.CheckUserReadPermissions('User Notifications', userPayload);
        const sSQL = `SELECT * FROM vwUserNotifications WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('User Notifications', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }

    @Mutation(() => UserNotification_)
    async CreateUserNotification(
        @Arg('input', () => CreateUserNotificationInput) input: CreateUserNotificationInput,
        @Ctx() { dataSource, userPayload }: AppContext, 
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeCreate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('User Notifications', this.GetUserFromPayload(userPayload));
            await entityObject.NewRecord();
            entityObject.SetMany(input);
            if (await entityObject.Save()) {
                // save worked, fire the AfterCreate event and then return all the data
                await this.AfterCreate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else 
                // save failed, return null
                return null;
        }
        else    
            return null;
    }

    // Before/After CREATE Event Hooks for Sub-Classes to Override
    protected async BeforeCreate(dataSource: DataSource, input: CreateUserNotificationInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterCreate(dataSource: DataSource, input: CreateUserNotificationInput) {
        const i = input, d = dataSource; // prevent error
    }
    
    @Mutation(() => UserNotification_)
    async UpdateUserNotification(
        @Arg('input', () => UpdateUserNotificationInput) input: UpdateUserNotificationInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('User Notifications', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for User Notifications
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateUserNotificationInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateUserNotificationInput) {
        const i = input, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for Resource Folders
//****************************************************************************
@ViewEntity({
   name: 'vwResourceFolders',
   synchronize: false,
})
@ObjectType()
export class ResourceFolder_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field(() => Int, {nullable: true}) 
    @Column()
    ParentID?: number;
      
    @Field() 
    @MaxLength(100)
    @Column()
    Name: string;
      
    @Field() 
    @MaxLength(510)
    @Column()
    ResourceTypeName: string;
      
    @Field({nullable: true}) 
    @Column()
    Description?: string;
      
    @Field(() => Int) 
    @Column()
    UserID: number;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
      
    @Field() 
    @MaxLength(8)
    @Column()
    UpdatedAt: Date;
      
    @Field({nullable: true}) 
    @MaxLength(100)
    @ViewColumn()
    Parent?: string;
      
    @Field() 
    @MaxLength(200)
    @ViewColumn()
    User: string;
    
    @Field(() => [ResourceFolder_])
    @OneToMany(() => ResourceFolder_, () => null)
    ResourceFolders: ResourceFolder_[]; // Link to ResourceFolders

}
        
//****************************************************************************
// INPUT TYPE for Resource Folders   
//****************************************************************************
@InputType()
export class CreateResourceFolderInput {
    @Field(() => Int, { nullable: true })
    ParentID: number;

    @Field()
    Name: string;

    @Field()
    ResourceTypeName: string;

    @Field({ nullable: true })
    Description: string;

    @Field(() => Int, )
    UserID: number;
}

        
//****************************************************************************
// INPUT TYPE for Resource Folders   
//****************************************************************************
@InputType()
export class UpdateResourceFolderInput {
    @Field(() => Int, )
    ID: number;

    @Field(() => Int, { nullable: true })
    ParentID: number;

    @Field()
    Name: string;

    @Field()
    ResourceTypeName: string;

    @Field({ nullable: true })
    Description: string;

    @Field(() => Int, )
    UserID: number;
}

//****************************************************************************
// RESOLVER for Resource Folders
//****************************************************************************
@ObjectType()
export class RunResourceFolderViewResult {
    @Field(() => [ResourceFolder_])
    Results: ResourceFolder_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(ResourceFolder_)
export class ResourceFolderResolver extends ResolverBase {
    @Query(() => RunResourceFolderViewResult)
    async RunResourceFolderViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunResourceFolderViewResult)
    async RunResourceFolderViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunResourceFolderViewResult)
    async RunResourceFolderDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Resource Folders';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => ResourceFolder_, { nullable: true })
    async ResourceFolder(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<ResourceFolder_ | null> {
        this.CheckUserReadPermissions('Resource Folders', userPayload);
        const sSQL = `SELECT * FROM vwResourceFolders WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Resource Folders', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }
  
    @FieldResolver(() => [ResourceFolder_])
    async ResourceFolders(@Root() resourcefolder: ResourceFolder_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Resource Folders', userPayload);
        const sSQL = `SELECT * FROM vwResourceFolders WHERE ParentID=${resourcefolder.ID} ` + this.getRowLevelSecurityWhereClause('Resource Folders', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
    
    @Mutation(() => ResourceFolder_)
    async CreateResourceFolder(
        @Arg('input', () => CreateResourceFolderInput) input: CreateResourceFolderInput,
        @Ctx() { dataSource, userPayload }: AppContext, 
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeCreate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Resource Folders', this.GetUserFromPayload(userPayload));
            await entityObject.NewRecord();
            entityObject.SetMany(input);
            if (await entityObject.Save()) {
                // save worked, fire the AfterCreate event and then return all the data
                await this.AfterCreate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else 
                // save failed, return null
                return null;
        }
        else    
            return null;
    }

    // Before/After CREATE Event Hooks for Sub-Classes to Override
    protected async BeforeCreate(dataSource: DataSource, input: CreateResourceFolderInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterCreate(dataSource: DataSource, input: CreateResourceFolderInput) {
        const i = input, d = dataSource; // prevent error
    }
    
    @Mutation(() => ResourceFolder_)
    async UpdateResourceFolder(
        @Arg('input', () => UpdateResourceFolderInput) input: UpdateResourceFolderInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Resource Folders', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for Resource Folders
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateResourceFolderInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateResourceFolderInput) {
        const i = input, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for Schema Info
//****************************************************************************
@ViewEntity({
   name: 'vwSchemaInfos',
   synchronize: false,
})
@ObjectType()
export class SchemaInfo_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field() 
    @MaxLength(100)
    @Column()
    SchemaName: string;
      
    @Field(() => Int) 
    @Column()
    EntityIDMin: number;
      
    @Field(() => Int) 
    @Column()
    EntityIDMax: number;
      
    @Field({nullable: true}) 
    @Column()
    Comments?: string;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
      
    @Field() 
    @MaxLength(8)
    @Column()
    UpdatedAt: Date;
    
}
        
//****************************************************************************
// INPUT TYPE for Schema Info   
//****************************************************************************
@InputType()
export class CreateSchemaInfoInput {
    @Field()
    SchemaName: string;

    @Field(() => Int, )
    EntityIDMin: number;

    @Field(() => Int, )
    EntityIDMax: number;

    @Field({ nullable: true })
    Comments: string;
}

        
//****************************************************************************
// INPUT TYPE for Schema Info   
//****************************************************************************
@InputType()
export class UpdateSchemaInfoInput {
    @Field(() => Int, )
    ID: number;

    @Field()
    SchemaName: string;

    @Field(() => Int, )
    EntityIDMin: number;

    @Field(() => Int, )
    EntityIDMax: number;

    @Field({ nullable: true })
    Comments: string;
}

//****************************************************************************
// RESOLVER for Schema Info
//****************************************************************************
@ObjectType()
export class RunSchemaInfoViewResult {
    @Field(() => [SchemaInfo_])
    Results: SchemaInfo_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(SchemaInfo_)
export class SchemaInfoResolver extends ResolverBase {
    @Query(() => RunSchemaInfoViewResult)
    async RunSchemaInfoViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunSchemaInfoViewResult)
    async RunSchemaInfoViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunSchemaInfoViewResult)
    async RunSchemaInfoDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Schema Info';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => SchemaInfo_, { nullable: true })
    async SchemaInfo(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<SchemaInfo_ | null> {
        this.CheckUserReadPermissions('Schema Info', userPayload);
        const sSQL = `SELECT * FROM vwSchemaInfos WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Schema Info', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }

    @Mutation(() => SchemaInfo_)
    async CreateSchemaInfo(
        @Arg('input', () => CreateSchemaInfoInput) input: CreateSchemaInfoInput,
        @Ctx() { dataSource, userPayload }: AppContext, 
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeCreate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Schema Info', this.GetUserFromPayload(userPayload));
            await entityObject.NewRecord();
            entityObject.SetMany(input);
            if (await entityObject.Save()) {
                // save worked, fire the AfterCreate event and then return all the data
                await this.AfterCreate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else 
                // save failed, return null
                return null;
        }
        else    
            return null;
    }

    // Before/After CREATE Event Hooks for Sub-Classes to Override
    protected async BeforeCreate(dataSource: DataSource, input: CreateSchemaInfoInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterCreate(dataSource: DataSource, input: CreateSchemaInfoInput) {
        const i = input, d = dataSource; // prevent error
    }
    
    @Mutation(() => SchemaInfo_)
    async UpdateSchemaInfo(
        @Arg('input', () => UpdateSchemaInfoInput) input: UpdateSchemaInfoInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Schema Info', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for Schema Info
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateSchemaInfoInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateSchemaInfoInput) {
        const i = input, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for Company Integration Record Maps
//****************************************************************************
@ViewEntity({
   name: 'vwCompanyIntegrationRecordMaps',
   synchronize: false,
})
@ObjectType()
export class CompanyIntegrationRecordMap_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field(() => Int) 
    @Column()
    CompanyIntegrationID: number;
      
    @Field() 
    @MaxLength(200)
    @Column()
    ExternalSystemRecordID: string;
      
    @Field(() => Int) 
    @Column()
    EntityID: number;
      
    @Field(() => Int) 
    @Column()
    EntityRecordID: number;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
      
    @Field() 
    @MaxLength(8)
    @Column()
    UpdatedAt: Date;
      
    @Field() 
    @MaxLength(100)
    @ViewColumn()
    Entity: string;
    
}
        
//****************************************************************************
// INPUT TYPE for Company Integration Record Maps   
//****************************************************************************
@InputType()
export class CreateCompanyIntegrationRecordMapInput {
    @Field(() => Int, )
    CompanyIntegrationID: number;

    @Field()
    ExternalSystemRecordID: string;

    @Field(() => Int, )
    EntityID: number;

    @Field(() => Int, )
    EntityRecordID: number;
}

        
//****************************************************************************
// INPUT TYPE for Company Integration Record Maps   
//****************************************************************************
@InputType()
export class UpdateCompanyIntegrationRecordMapInput {
    @Field(() => Int, )
    ID: number;

    @Field(() => Int, )
    CompanyIntegrationID: number;

    @Field()
    ExternalSystemRecordID: string;

    @Field(() => Int, )
    EntityID: number;

    @Field(() => Int, )
    EntityRecordID: number;
}

//****************************************************************************
// RESOLVER for Company Integration Record Maps
//****************************************************************************
@ObjectType()
export class RunCompanyIntegrationRecordMapViewResult {
    @Field(() => [CompanyIntegrationRecordMap_])
    Results: CompanyIntegrationRecordMap_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(CompanyIntegrationRecordMap_)
export class CompanyIntegrationRecordMapResolver extends ResolverBase {
    @Query(() => RunCompanyIntegrationRecordMapViewResult)
    async RunCompanyIntegrationRecordMapViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunCompanyIntegrationRecordMapViewResult)
    async RunCompanyIntegrationRecordMapViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunCompanyIntegrationRecordMapViewResult)
    async RunCompanyIntegrationRecordMapDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Company Integration Record Maps';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => CompanyIntegrationRecordMap_, { nullable: true })
    async CompanyIntegrationRecordMap(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<CompanyIntegrationRecordMap_ | null> {
        this.CheckUserReadPermissions('Company Integration Record Maps', userPayload);
        const sSQL = `SELECT * FROM vwCompanyIntegrationRecordMaps WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Company Integration Record Maps', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }

    @Mutation(() => CompanyIntegrationRecordMap_)
    async CreateCompanyIntegrationRecordMap(
        @Arg('input', () => CreateCompanyIntegrationRecordMapInput) input: CreateCompanyIntegrationRecordMapInput,
        @Ctx() { dataSource, userPayload }: AppContext, 
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeCreate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Company Integration Record Maps', this.GetUserFromPayload(userPayload));
            await entityObject.NewRecord();
            entityObject.SetMany(input);
            if (await entityObject.Save()) {
                // save worked, fire the AfterCreate event and then return all the data
                await this.AfterCreate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else 
                // save failed, return null
                return null;
        }
        else    
            return null;
    }

    // Before/After CREATE Event Hooks for Sub-Classes to Override
    protected async BeforeCreate(dataSource: DataSource, input: CreateCompanyIntegrationRecordMapInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterCreate(dataSource: DataSource, input: CreateCompanyIntegrationRecordMapInput) {
        const i = input, d = dataSource; // prevent error
    }
    
    @Mutation(() => CompanyIntegrationRecordMap_)
    async UpdateCompanyIntegrationRecordMap(
        @Arg('input', () => UpdateCompanyIntegrationRecordMapInput) input: UpdateCompanyIntegrationRecordMapInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Company Integration Record Maps', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for Company Integration Record Maps
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateCompanyIntegrationRecordMapInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateCompanyIntegrationRecordMapInput) {
        const i = input, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for Record Merge Logs
//****************************************************************************
@ViewEntity({
   name: 'vwRecordMergeLogs',
   synchronize: false,
})
@ObjectType()
export class RecordMergeLog_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field(() => Int) 
    @Column()
    EntityID: number;
      
    @Field(() => Int) 
    @Column()
    SurvivingRecordID: number;
      
    @Field(() => Int) 
    @Column()
    InitiatedByUserID: number;
      
    @Field() 
    @MaxLength(20)
    @Column()
    ApprovalStatus: string;
      
    @Field(() => Int, {nullable: true}) 
    @Column()
    ApprovedByUserID?: number;
      
    @Field() 
    @MaxLength(20)
    @Column()
    ProcessingStatus: string;
      
    @Field() 
    @MaxLength(8)
    @Column()
    ProcessingStartedAt: Date;
      
    @Field({nullable: true}) 
    @MaxLength(8)
    @Column()
    ProcessingEndedAt?: Date;
      
    @Field({nullable: true}) 
    @Column()
    ProcessingLog?: string;
      
    @Field({nullable: true}) 
    @Column()
    Comments?: string;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
      
    @Field({nullable: true}) 
    @MaxLength(8)
    @Column()
    UpdatedAt?: Date;
      
    @Field() 
    @MaxLength(100)
    @ViewColumn()
    Entity: string;
      
    @Field() 
    @MaxLength(200)
    @ViewColumn()
    InitiatedByUser: string;
    
    @Field(() => [RecordMergeDeletionLog_])
    @OneToMany(() => RecordMergeDeletionLog_, () => null)
    RecordMergeDeletionLogs: RecordMergeDeletionLog_[]; // Link to RecordMergeDeletionLogs

}
        
//****************************************************************************
// INPUT TYPE for Record Merge Logs   
//****************************************************************************
@InputType()
export class CreateRecordMergeLogInput {
    @Field(() => Int, )
    EntityID: number;

    @Field(() => Int, )
    SurvivingRecordID: number;

    @Field(() => Int, )
    InitiatedByUserID: number;

    @Field()
    ApprovalStatus: string;

    @Field(() => Int, { nullable: true })
    ApprovedByUserID: number;

    @Field()
    ProcessingStatus: string;

    @Field()
    ProcessingStartedAt: Date;

    @Field({ nullable: true })
    ProcessingEndedAt: Date;

    @Field({ nullable: true })
    ProcessingLog: string;

    @Field({ nullable: true })
    Comments: string;
}

        
//****************************************************************************
// INPUT TYPE for Record Merge Logs   
//****************************************************************************
@InputType()
export class UpdateRecordMergeLogInput {
    @Field(() => Int, )
    ID: number;

    @Field(() => Int, )
    EntityID: number;

    @Field(() => Int, )
    SurvivingRecordID: number;

    @Field(() => Int, )
    InitiatedByUserID: number;

    @Field()
    ApprovalStatus: string;

    @Field(() => Int, { nullable: true })
    ApprovedByUserID: number;

    @Field()
    ProcessingStatus: string;

    @Field()
    ProcessingStartedAt: Date;

    @Field({ nullable: true })
    ProcessingEndedAt: Date;

    @Field({ nullable: true })
    ProcessingLog: string;

    @Field({ nullable: true })
    Comments: string;
}

//****************************************************************************
// RESOLVER for Record Merge Logs
//****************************************************************************
@ObjectType()
export class RunRecordMergeLogViewResult {
    @Field(() => [RecordMergeLog_])
    Results: RecordMergeLog_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(RecordMergeLog_)
export class RecordMergeLogResolver extends ResolverBase {
    @Query(() => RunRecordMergeLogViewResult)
    async RunRecordMergeLogViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunRecordMergeLogViewResult)
    async RunRecordMergeLogViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunRecordMergeLogViewResult)
    async RunRecordMergeLogDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Record Merge Logs';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RecordMergeLog_, { nullable: true })
    async RecordMergeLog(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<RecordMergeLog_ | null> {
        this.CheckUserReadPermissions('Record Merge Logs', userPayload);
        const sSQL = `SELECT * FROM vwRecordMergeLogs WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Record Merge Logs', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }
  
    @FieldResolver(() => [RecordMergeDeletionLog_])
    async RecordMergeDeletionLogs(@Root() recordmergelog: RecordMergeLog_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Record Merge Deletion Logs', userPayload);
        const sSQL = `SELECT * FROM vwRecordMergeDeletionLogs WHERE RecordMergeLogID=${recordmergelog.ID} ` + this.getRowLevelSecurityWhereClause('Record Merge Deletion Logs', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
    
    @Mutation(() => RecordMergeLog_)
    async CreateRecordMergeLog(
        @Arg('input', () => CreateRecordMergeLogInput) input: CreateRecordMergeLogInput,
        @Ctx() { dataSource, userPayload }: AppContext, 
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeCreate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Record Merge Logs', this.GetUserFromPayload(userPayload));
            await entityObject.NewRecord();
            entityObject.SetMany(input);
            if (await entityObject.Save()) {
                // save worked, fire the AfterCreate event and then return all the data
                await this.AfterCreate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else 
                // save failed, return null
                return null;
        }
        else    
            return null;
    }

    // Before/After CREATE Event Hooks for Sub-Classes to Override
    protected async BeforeCreate(dataSource: DataSource, input: CreateRecordMergeLogInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterCreate(dataSource: DataSource, input: CreateRecordMergeLogInput) {
        const i = input, d = dataSource; // prevent error
    }
    
    @Mutation(() => RecordMergeLog_)
    async UpdateRecordMergeLog(
        @Arg('input', () => UpdateRecordMergeLogInput) input: UpdateRecordMergeLogInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Record Merge Logs', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for Record Merge Logs
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateRecordMergeLogInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateRecordMergeLogInput) {
        const i = input, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for Record Merge Deletion Logs
//****************************************************************************
@ViewEntity({
   name: 'vwRecordMergeDeletionLogs',
   synchronize: false,
})
@ObjectType()
export class RecordMergeDeletionLog_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field(() => Int) 
    @Column()
    RecordMergeLogID: number;
      
    @Field(() => Int) 
    @Column()
    DeletedRecordID: number;
      
    @Field() 
    @MaxLength(20)
    @Column()
    Status: string;
      
    @Field({nullable: true}) 
    @Column()
    ProcessingLog?: string;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
      
    @Field() 
    @MaxLength(8)
    @Column()
    UpdatedAt: Date;
    
}
        
//****************************************************************************
// INPUT TYPE for Record Merge Deletion Logs   
//****************************************************************************
@InputType()
export class CreateRecordMergeDeletionLogInput {
    @Field(() => Int, )
    RecordMergeLogID: number;

    @Field(() => Int, )
    DeletedRecordID: number;

    @Field()
    Status: string;

    @Field({ nullable: true })
    ProcessingLog: string;
}

        
//****************************************************************************
// INPUT TYPE for Record Merge Deletion Logs   
//****************************************************************************
@InputType()
export class UpdateRecordMergeDeletionLogInput {
    @Field(() => Int, )
    ID: number;

    @Field(() => Int, )
    RecordMergeLogID: number;

    @Field(() => Int, )
    DeletedRecordID: number;

    @Field()
    Status: string;

    @Field({ nullable: true })
    ProcessingLog: string;
}

//****************************************************************************
// RESOLVER for Record Merge Deletion Logs
//****************************************************************************
@ObjectType()
export class RunRecordMergeDeletionLogViewResult {
    @Field(() => [RecordMergeDeletionLog_])
    Results: RecordMergeDeletionLog_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(RecordMergeDeletionLog_)
export class RecordMergeDeletionLogResolver extends ResolverBase {
    @Query(() => RunRecordMergeDeletionLogViewResult)
    async RunRecordMergeDeletionLogViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunRecordMergeDeletionLogViewResult)
    async RunRecordMergeDeletionLogViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunRecordMergeDeletionLogViewResult)
    async RunRecordMergeDeletionLogDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Record Merge Deletion Logs';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RecordMergeDeletionLog_, { nullable: true })
    async RecordMergeDeletionLog(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<RecordMergeDeletionLog_ | null> {
        this.CheckUserReadPermissions('Record Merge Deletion Logs', userPayload);
        const sSQL = `SELECT * FROM vwRecordMergeDeletionLogs WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Record Merge Deletion Logs', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }

    @Mutation(() => RecordMergeDeletionLog_)
    async CreateRecordMergeDeletionLog(
        @Arg('input', () => CreateRecordMergeDeletionLogInput) input: CreateRecordMergeDeletionLogInput,
        @Ctx() { dataSource, userPayload }: AppContext, 
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeCreate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Record Merge Deletion Logs', this.GetUserFromPayload(userPayload));
            await entityObject.NewRecord();
            entityObject.SetMany(input);
            if (await entityObject.Save()) {
                // save worked, fire the AfterCreate event and then return all the data
                await this.AfterCreate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else 
                // save failed, return null
                return null;
        }
        else    
            return null;
    }

    // Before/After CREATE Event Hooks for Sub-Classes to Override
    protected async BeforeCreate(dataSource: DataSource, input: CreateRecordMergeDeletionLogInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterCreate(dataSource: DataSource, input: CreateRecordMergeDeletionLogInput) {
        const i = input, d = dataSource; // prevent error
    }
    
    @Mutation(() => RecordMergeDeletionLog_)
    async UpdateRecordMergeDeletionLog(
        @Arg('input', () => UpdateRecordMergeDeletionLogInput) input: UpdateRecordMergeDeletionLogInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Record Merge Deletion Logs', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for Record Merge Deletion Logs
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateRecordMergeDeletionLogInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateRecordMergeDeletionLogInput) {
        const i = input, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for Book Categories
//****************************************************************************
@ViewEntity({
   name: 'vwBookCategories',
   synchronize: false,
})
@ObjectType()
export class BookCategory_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field(() => Int, {nullable: true}) 
    @Column()
    ParentID?: number;
      
    @Field() 
    @MaxLength(200)
    @Column()
    Name: string;
      
    @Field({nullable: true}) 
    @Column()
    Description?: string;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
      
    @Field() 
    @MaxLength(8)
    @Column()
    UpdatedAt: Date;
      
    @Field(() => Int, {nullable: true}) 
    @Column()
    DisplayRank?: number;
      
    @Field({nullable: true}) 
    @MaxLength(200)
    @ViewColumn()
    Parent?: string;
    
    @Field(() => [BookCategory_])
    @OneToMany(() => BookCategory_, () => null)
    BookCategories: BookCategory_[]; // Link to BookCategories

    @Field(() => [Book_])
    @OneToMany(() => Book_, () => null)
    Books: Book_[]; // Link to Books

}
        
//****************************************************************************
// INPUT TYPE for Book Categories   
//****************************************************************************
@InputType()
export class CreateBookCategoryInput {
    @Field(() => Int, { nullable: true })
    ParentID: number;

    @Field()
    Name: string;

    @Field({ nullable: true })
    Description: string;

    @Field(() => Int, { nullable: true })
    DisplayRank: number;
}

        
//****************************************************************************
// INPUT TYPE for Book Categories   
//****************************************************************************
@InputType()
export class UpdateBookCategoryInput {
    @Field(() => Int, )
    ID: number;

    @Field(() => Int, { nullable: true })
    ParentID: number;

    @Field()
    Name: string;

    @Field({ nullable: true })
    Description: string;

    @Field(() => Int, { nullable: true })
    DisplayRank: number;
}

//****************************************************************************
// RESOLVER for Book Categories
//****************************************************************************
@ObjectType()
export class RunBookCategoryViewResult {
    @Field(() => [BookCategory_])
    Results: BookCategory_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(BookCategory_)
export class BookCategoryResolver extends ResolverBase {
    @Query(() => RunBookCategoryViewResult)
    async RunBookCategoryViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunBookCategoryViewResult)
    async RunBookCategoryViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunBookCategoryViewResult)
    async RunBookCategoryDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Book Categories';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => BookCategory_, { nullable: true })
    async BookCategory(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<BookCategory_ | null> {
        this.CheckUserReadPermissions('Book Categories', userPayload);
        const sSQL = `SELECT * FROM vwBookCategories WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Book Categories', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }
  
    @FieldResolver(() => [BookCategory_])
    async BookCategories(@Root() bookcategory: BookCategory_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Book Categories', userPayload);
        const sSQL = `SELECT * FROM vwBookCategories WHERE ParentID=${bookcategory.ID} ` + this.getRowLevelSecurityWhereClause('Book Categories', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [Book_])
    async Books(@Root() bookcategory: BookCategory_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Books', userPayload);
        const sSQL = `SELECT * FROM vwBooks WHERE BookCategoryID=${bookcategory.ID} ` + this.getRowLevelSecurityWhereClause('Books', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
    
    @Mutation(() => BookCategory_)
    async CreateBookCategory(
        @Arg('input', () => CreateBookCategoryInput) input: CreateBookCategoryInput,
        @Ctx() { dataSource, userPayload }: AppContext, 
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeCreate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Book Categories', this.GetUserFromPayload(userPayload));
            await entityObject.NewRecord();
            entityObject.SetMany(input);
            if (await entityObject.Save()) {
                // save worked, fire the AfterCreate event and then return all the data
                await this.AfterCreate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else 
                // save failed, return null
                return null;
        }
        else    
            return null;
    }

    // Before/After CREATE Event Hooks for Sub-Classes to Override
    protected async BeforeCreate(dataSource: DataSource, input: CreateBookCategoryInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterCreate(dataSource: DataSource, input: CreateBookCategoryInput) {
        const i = input, d = dataSource; // prevent error
    }
    
    @Mutation(() => BookCategory_)
    async UpdateBookCategory(
        @Arg('input', () => UpdateBookCategoryInput) input: UpdateBookCategoryInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Book Categories', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for Book Categories
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateBookCategoryInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateBookCategoryInput) {
        const i = input, d = dataSource; // prevent error
    }

    @Mutation(() => Int)
    async DeleteBookCategory(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        if (await this.BeforeDelete(dataSource, ID)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Book Categories', this.GetUserFromPayload(userPayload));
            await entityObject.Load(ID)
            if (await entityObject.Delete()) {
                await this.AfterDelete(dataSource, ID); // fire event
                return ID;
            }
            else 
                return null; // delete failed
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeDelete(dataSource: DataSource, ID: number): Promise<boolean> {
        const i = ID, d = dataSource; // prevent error;
        return true;
    }
    protected async AfterDelete(dataSource: DataSource, ID: number) {
        const i = ID, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for Books
//****************************************************************************
@ViewEntity({
   name: 'vwBooks',
   synchronize: false,
})
@ObjectType()
export class Book_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field(() => Int) 
    @Column()
    BookCategoryID: number;
      
    @Field() 
    @MaxLength(200)
    @Column()
    Name: string;
      
    @Field({nullable: true}) 
    @Column()
    Description?: string;
      
    @Field({nullable: true}) 
    @MaxLength(2000)
    @Column()
    CoverImageURL?: string;
      
    @Field(() => Int) 
    @Column()
    Pages: number;
      
    @Field({nullable: true}) 
    @Column()
    FullText?: string;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
      
    @Field() 
    @MaxLength(8)
    @Column()
    UpdatedAt: Date;
      
    @Field(() => Float) 
    @Column()
    Price: number;
      
    @Field(() => Float, {nullable: true}) 
    @Column()
    DiscountAmount?: number;
      
    @Field() 
    @MaxLength(200)
    @Column()
    Author: string;
      
    @Field() 
    @MaxLength(100)
    @Column()
    Language: string;
      
    @Field() 
    @MaxLength(200)
    @ViewColumn()
    BookCategory: string;
    
    @Field(() => [BookTopic_])
    @OneToMany(() => BookTopic_, () => null)
    BookTopics: BookTopic_[]; // Link to BookTopics

    @Field(() => [PurchaseDetail_])
    @OneToMany(() => PurchaseDetail_, () => null)
    PurchaseDetails: PurchaseDetail_[]; // Link to PurchaseDetails

}
        
//****************************************************************************
// INPUT TYPE for Books   
//****************************************************************************
@InputType()
export class CreateBookInput {
    @Field(() => Int, )
    BookCategoryID: number;

    @Field()
    Name: string;

    @Field({ nullable: true })
    Description: string;

    @Field({ nullable: true })
    CoverImageURL: string;

    @Field(() => Int, )
    Pages: number;

    @Field({ nullable: true })
    FullText: string;

    @Field(() => Float, )
    Price: number;

    @Field(() => Float, { nullable: true })
    DiscountAmount: number;

    @Field()
    Author: string;

    @Field()
    Language: string;
}

        
//****************************************************************************
// INPUT TYPE for Books   
//****************************************************************************
@InputType()
export class UpdateBookInput {
    @Field(() => Int, )
    ID: number;

    @Field(() => Int, )
    BookCategoryID: number;

    @Field()
    Name: string;

    @Field({ nullable: true })
    Description: string;

    @Field({ nullable: true })
    CoverImageURL: string;

    @Field(() => Int, )
    Pages: number;

    @Field({ nullable: true })
    FullText: string;

    @Field(() => Float, )
    Price: number;

    @Field(() => Float, { nullable: true })
    DiscountAmount: number;

    @Field()
    Author: string;

    @Field()
    Language: string;
}

//****************************************************************************
// RESOLVER for Books
//****************************************************************************
@ObjectType()
export class RunBookViewResult {
    @Field(() => [Book_])
    Results: Book_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(Book_)
export class BookResolver extends ResolverBase {
    @Query(() => RunBookViewResult)
    async RunBookViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunBookViewResult)
    async RunBookViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunBookViewResult)
    async RunBookDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Books';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => Book_, { nullable: true })
    async Book(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<Book_ | null> {
        this.CheckUserReadPermissions('Books', userPayload);
        const sSQL = `SELECT * FROM vwBooks WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Books', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }
  
    @FieldResolver(() => [BookTopic_])
    async BookTopics(@Root() book: Book_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Book Topics', userPayload);
        const sSQL = `SELECT * FROM vwBookTopics WHERE BookID=${book.ID} ` + this.getRowLevelSecurityWhereClause('Book Topics', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [PurchaseDetail_])
    async PurchaseDetails(@Root() book: Book_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Purchase Details', userPayload);
        const sSQL = `SELECT * FROM vwPurchaseDetails WHERE BookID=${book.ID} ` + this.getRowLevelSecurityWhereClause('Purchase Details', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
    
    @Mutation(() => Book_)
    async CreateBook(
        @Arg('input', () => CreateBookInput) input: CreateBookInput,
        @Ctx() { dataSource, userPayload }: AppContext, 
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeCreate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Books', this.GetUserFromPayload(userPayload));
            await entityObject.NewRecord();
            entityObject.SetMany(input);
            if (await entityObject.Save()) {
                // save worked, fire the AfterCreate event and then return all the data
                await this.AfterCreate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else 
                // save failed, return null
                return null;
        }
        else    
            return null;
    }

    // Before/After CREATE Event Hooks for Sub-Classes to Override
    protected async BeforeCreate(dataSource: DataSource, input: CreateBookInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterCreate(dataSource: DataSource, input: CreateBookInput) {
        const i = input, d = dataSource; // prevent error
    }
    
    @Mutation(() => Book_)
    async UpdateBook(
        @Arg('input', () => UpdateBookInput) input: UpdateBookInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Books', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for Books
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateBookInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateBookInput) {
        const i = input, d = dataSource; // prevent error
    }

    @Mutation(() => Int)
    async DeleteBook(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        if (await this.BeforeDelete(dataSource, ID)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Books', this.GetUserFromPayload(userPayload));
            await entityObject.Load(ID)
            if (await entityObject.Delete()) {
                await this.AfterDelete(dataSource, ID); // fire event
                return ID;
            }
            else 
                return null; // delete failed
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeDelete(dataSource: DataSource, ID: number): Promise<boolean> {
        const i = ID, d = dataSource; // prevent error;
        return true;
    }
    protected async AfterDelete(dataSource: DataSource, ID: number) {
        const i = ID, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for Topics
//****************************************************************************
@ViewEntity({
   name: 'vwTopics',
   synchronize: false,
})
@ObjectType()
export class Topic_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field() 
    @MaxLength(200)
    @Column()
    Name: string;
      
    @Field({nullable: true}) 
    @Column()
    Description?: string;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
      
    @Field() 
    @MaxLength(8)
    @Column()
    UpdatedAt: Date;
      
    @Field(() => Int, {nullable: true}) 
    @Column()
    DisplayRank?: number;
    
    @Field(() => [BookTopic_])
    @OneToMany(() => BookTopic_, () => null)
    BookTopics: BookTopic_[]; // Link to BookTopics

    @Field(() => [PersonTopic_])
    @OneToMany(() => PersonTopic_, () => null)
    PersonTopics: PersonTopic_[]; // Link to PersonTopics

}
        
//****************************************************************************
// INPUT TYPE for Topics   
//****************************************************************************
@InputType()
export class CreateTopicInput {
    @Field()
    Name: string;

    @Field({ nullable: true })
    Description: string;

    @Field(() => Int, { nullable: true })
    DisplayRank: number;
}

        
//****************************************************************************
// INPUT TYPE for Topics   
//****************************************************************************
@InputType()
export class UpdateTopicInput {
    @Field(() => Int, )
    ID: number;

    @Field()
    Name: string;

    @Field({ nullable: true })
    Description: string;

    @Field(() => Int, { nullable: true })
    DisplayRank: number;
}

//****************************************************************************
// RESOLVER for Topics
//****************************************************************************
@ObjectType()
export class RunTopicViewResult {
    @Field(() => [Topic_])
    Results: Topic_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(Topic_)
export class TopicResolver extends ResolverBase {
    @Query(() => RunTopicViewResult)
    async RunTopicViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunTopicViewResult)
    async RunTopicViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunTopicViewResult)
    async RunTopicDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Topics';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => Topic_, { nullable: true })
    async Topic(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<Topic_ | null> {
        this.CheckUserReadPermissions('Topics', userPayload);
        const sSQL = `SELECT * FROM vwTopics WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Topics', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }
  
    @FieldResolver(() => [BookTopic_])
    async BookTopics(@Root() topic: Topic_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Book Topics', userPayload);
        const sSQL = `SELECT * FROM vwBookTopics WHERE TopicID=${topic.ID} ` + this.getRowLevelSecurityWhereClause('Book Topics', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [PersonTopic_])
    async PersonTopics(@Root() topic: Topic_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Person Topics', userPayload);
        const sSQL = `SELECT * FROM vwPersonTopics WHERE TopicID=${topic.ID} ` + this.getRowLevelSecurityWhereClause('Person Topics', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
    
    @Mutation(() => Topic_)
    async CreateTopic(
        @Arg('input', () => CreateTopicInput) input: CreateTopicInput,
        @Ctx() { dataSource, userPayload }: AppContext, 
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeCreate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Topics', this.GetUserFromPayload(userPayload));
            await entityObject.NewRecord();
            entityObject.SetMany(input);
            if (await entityObject.Save()) {
                // save worked, fire the AfterCreate event and then return all the data
                await this.AfterCreate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else 
                // save failed, return null
                return null;
        }
        else    
            return null;
    }

    // Before/After CREATE Event Hooks for Sub-Classes to Override
    protected async BeforeCreate(dataSource: DataSource, input: CreateTopicInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterCreate(dataSource: DataSource, input: CreateTopicInput) {
        const i = input, d = dataSource; // prevent error
    }
    
    @Mutation(() => Topic_)
    async UpdateTopic(
        @Arg('input', () => UpdateTopicInput) input: UpdateTopicInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Topics', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for Topics
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateTopicInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateTopicInput) {
        const i = input, d = dataSource; // prevent error
    }

    @Mutation(() => Int)
    async DeleteTopic(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        if (await this.BeforeDelete(dataSource, ID)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Topics', this.GetUserFromPayload(userPayload));
            await entityObject.Load(ID)
            if (await entityObject.Delete()) {
                await this.AfterDelete(dataSource, ID); // fire event
                return ID;
            }
            else 
                return null; // delete failed
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeDelete(dataSource: DataSource, ID: number): Promise<boolean> {
        const i = ID, d = dataSource; // prevent error;
        return true;
    }
    protected async AfterDelete(dataSource: DataSource, ID: number) {
        const i = ID, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for Book Topics
//****************************************************************************
@ViewEntity({
   name: 'vwBookTopics',
   synchronize: false,
})
@ObjectType()
export class BookTopic_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field(() => Int) 
    @Column()
    BookID: number;
      
    @Field(() => Int) 
    @Column()
    TopicID: number;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
      
    @Field() 
    @MaxLength(8)
    @Column()
    UpdatedAt: Date;
      
    @Field() 
    @MaxLength(200)
    @ViewColumn()
    Book: string;
      
    @Field() 
    @MaxLength(200)
    @ViewColumn()
    Topic: string;
    
    @Field(() => [PersonTopic_])
    @OneToMany(() => PersonTopic_, () => null)
    PersonTopics: PersonTopic_[]; // Link to PersonTopics

}
        
//****************************************************************************
// INPUT TYPE for Book Topics   
//****************************************************************************
@InputType()
export class CreateBookTopicInput {
    @Field(() => Int, )
    BookID: number;

    @Field(() => Int, )
    TopicID: number;
}

        
//****************************************************************************
// INPUT TYPE for Book Topics   
//****************************************************************************
@InputType()
export class UpdateBookTopicInput {
    @Field(() => Int, )
    ID: number;

    @Field(() => Int, )
    BookID: number;

    @Field(() => Int, )
    TopicID: number;
}

//****************************************************************************
// RESOLVER for Book Topics
//****************************************************************************
@ObjectType()
export class RunBookTopicViewResult {
    @Field(() => [BookTopic_])
    Results: BookTopic_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(BookTopic_)
export class BookTopicResolver extends ResolverBase {
    @Query(() => RunBookTopicViewResult)
    async RunBookTopicViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunBookTopicViewResult)
    async RunBookTopicViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunBookTopicViewResult)
    async RunBookTopicDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Book Topics';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => BookTopic_, { nullable: true })
    async BookTopic(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<BookTopic_ | null> {
        this.CheckUserReadPermissions('Book Topics', userPayload);
        const sSQL = `SELECT * FROM vwBookTopics WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Book Topics', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }
  
    @FieldResolver(() => [PersonTopic_])
    async PersonTopics(@Root() booktopic: BookTopic_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Person Topics', userPayload);
        const sSQL = `SELECT * FROM vwPersonTopics WHERE BookTopicID=${booktopic.ID} ` + this.getRowLevelSecurityWhereClause('Person Topics', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
    
    @Mutation(() => BookTopic_)
    async CreateBookTopic(
        @Arg('input', () => CreateBookTopicInput) input: CreateBookTopicInput,
        @Ctx() { dataSource, userPayload }: AppContext, 
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeCreate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Book Topics', this.GetUserFromPayload(userPayload));
            await entityObject.NewRecord();
            entityObject.SetMany(input);
            if (await entityObject.Save()) {
                // save worked, fire the AfterCreate event and then return all the data
                await this.AfterCreate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else 
                // save failed, return null
                return null;
        }
        else    
            return null;
    }

    // Before/After CREATE Event Hooks for Sub-Classes to Override
    protected async BeforeCreate(dataSource: DataSource, input: CreateBookTopicInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterCreate(dataSource: DataSource, input: CreateBookTopicInput) {
        const i = input, d = dataSource; // prevent error
    }
    
    @Mutation(() => BookTopic_)
    async UpdateBookTopic(
        @Arg('input', () => UpdateBookTopicInput) input: UpdateBookTopicInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Book Topics', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for Book Topics
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateBookTopicInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateBookTopicInput) {
        const i = input, d = dataSource; // prevent error
    }

    @Mutation(() => Int)
    async DeleteBookTopic(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        if (await this.BeforeDelete(dataSource, ID)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Book Topics', this.GetUserFromPayload(userPayload));
            await entityObject.Load(ID)
            if (await entityObject.Delete()) {
                await this.AfterDelete(dataSource, ID); // fire event
                return ID;
            }
            else 
                return null; // delete failed
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeDelete(dataSource: DataSource, ID: number): Promise<boolean> {
        const i = ID, d = dataSource; // prevent error;
        return true;
    }
    protected async AfterDelete(dataSource: DataSource, ID: number) {
        const i = ID, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for Organizations
//****************************************************************************
@ViewEntity({
   name: 'vwOrganizations',
   synchronize: false,
})
@ObjectType()
export class Organization_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field() 
    @MaxLength(510)
    @Column()
    Name: string;
      
    @Field({nullable: true}) 
    @MaxLength(200)
    @Column()
    Address?: string;
      
    @Field({nullable: true}) 
    @MaxLength(100)
    @Column()
    City?: string;
      
    @Field({nullable: true}) 
    @MaxLength(100)
    @Column()
    StateProvince?: string;
      
    @Field({nullable: true}) 
    @MaxLength(100)
    @Column()
    PostalCode?: string;
      
    @Field({nullable: true}) 
    @MaxLength(200)
    @Column()
    Country?: string;
      
    @Field({nullable: true}) 
    @MaxLength(510)
    @Column()
    Website?: string;
      
    @Field({nullable: true}) 
    @MaxLength(40)
    @Column()
    Phone?: string;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
      
    @Field() 
    @MaxLength(8)
    @Column()
    UpdatedAt: Date;
    
}
        
//****************************************************************************
// INPUT TYPE for Organizations   
//****************************************************************************
@InputType()
export class CreateOrganizationInput {
    @Field()
    Name: string;

    @Field({ nullable: true })
    Address: string;

    @Field({ nullable: true })
    City: string;

    @Field({ nullable: true })
    StateProvince: string;

    @Field({ nullable: true })
    PostalCode: string;

    @Field({ nullable: true })
    Country: string;

    @Field({ nullable: true })
    Website: string;

    @Field({ nullable: true })
    Phone: string;
}

        
//****************************************************************************
// INPUT TYPE for Organizations   
//****************************************************************************
@InputType()
export class UpdateOrganizationInput {
    @Field(() => Int, )
    ID: number;

    @Field()
    Name: string;

    @Field({ nullable: true })
    Address: string;

    @Field({ nullable: true })
    City: string;

    @Field({ nullable: true })
    StateProvince: string;

    @Field({ nullable: true })
    PostalCode: string;

    @Field({ nullable: true })
    Country: string;

    @Field({ nullable: true })
    Website: string;

    @Field({ nullable: true })
    Phone: string;
}

//****************************************************************************
// RESOLVER for Organizations
//****************************************************************************
@ObjectType()
export class RunOrganizationViewResult {
    @Field(() => [Organization_])
    Results: Organization_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(Organization_)
export class OrganizationResolver extends ResolverBase {
    @Query(() => RunOrganizationViewResult)
    async RunOrganizationViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunOrganizationViewResult)
    async RunOrganizationViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunOrganizationViewResult)
    async RunOrganizationDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Organizations';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => Organization_, { nullable: true })
    async Organization(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<Organization_ | null> {
        this.CheckUserReadPermissions('Organizations', userPayload);
        const sSQL = `SELECT * FROM vwOrganizations WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Organizations', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }

    @Mutation(() => Organization_)
    async CreateOrganization(
        @Arg('input', () => CreateOrganizationInput) input: CreateOrganizationInput,
        @Ctx() { dataSource, userPayload }: AppContext, 
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeCreate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Organizations', this.GetUserFromPayload(userPayload));
            await entityObject.NewRecord();
            entityObject.SetMany(input);
            if (await entityObject.Save()) {
                // save worked, fire the AfterCreate event and then return all the data
                await this.AfterCreate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else 
                // save failed, return null
                return null;
        }
        else    
            return null;
    }

    // Before/After CREATE Event Hooks for Sub-Classes to Override
    protected async BeforeCreate(dataSource: DataSource, input: CreateOrganizationInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterCreate(dataSource: DataSource, input: CreateOrganizationInput) {
        const i = input, d = dataSource; // prevent error
    }
    
    @Mutation(() => Organization_)
    async UpdateOrganization(
        @Arg('input', () => UpdateOrganizationInput) input: UpdateOrganizationInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Organizations', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for Organizations
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdateOrganizationInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdateOrganizationInput) {
        const i = input, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for Persons
//****************************************************************************
@ViewEntity({
   name: 'vwPersons',
   synchronize: false,
})
@ObjectType()
export class Person_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field() 
    @MaxLength(100)
    @Column()
    FirstName: string;
      
    @Field() 
    @MaxLength(100)
    @Column()
    LastName: string;
      
    @Field(() => Int, {nullable: true}) 
    @Column()
    OrganizationID?: number;
      
    @Field({nullable: true}) 
    @MaxLength(200)
    @Column()
    Email?: string;
      
    @Field({nullable: true}) 
    @MaxLength(40)
    @Column()
    Phone?: string;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
      
    @Field() 
    @MaxLength(8)
    @Column()
    UpdatedAt: Date;
    
    @Field(() => [PersonTopic_])
    @OneToMany(() => PersonTopic_, () => null)
    PersonTopics: PersonTopic_[]; // Link to PersonTopics

    @Field(() => [Purchase_])
    @OneToMany(() => Purchase_, () => null)
    Purchases: Purchase_[]; // Link to Purchases

}
        
//****************************************************************************
// INPUT TYPE for Persons   
//****************************************************************************
@InputType()
export class CreatePersonInput {
    @Field()
    FirstName: string;

    @Field()
    LastName: string;

    @Field(() => Int, { nullable: true })
    OrganizationID: number;

    @Field({ nullable: true })
    Email: string;

    @Field({ nullable: true })
    Phone: string;
}

        
//****************************************************************************
// INPUT TYPE for Persons   
//****************************************************************************
@InputType()
export class UpdatePersonInput {
    @Field(() => Int, )
    ID: number;

    @Field()
    FirstName: string;

    @Field()
    LastName: string;

    @Field(() => Int, { nullable: true })
    OrganizationID: number;

    @Field({ nullable: true })
    Email: string;

    @Field({ nullable: true })
    Phone: string;
}

//****************************************************************************
// RESOLVER for Persons
//****************************************************************************
@ObjectType()
export class RunPersonViewResult {
    @Field(() => [Person_])
    Results: Person_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(Person_)
export class PersonResolver extends ResolverBase {
    @Query(() => RunPersonViewResult)
    async RunPersonViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunPersonViewResult)
    async RunPersonViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunPersonViewResult)
    async RunPersonDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Persons';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => Person_, { nullable: true })
    async Person(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<Person_ | null> {
        this.CheckUserReadPermissions('Persons', userPayload);
        const sSQL = `SELECT * FROM vwPersons WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Persons', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }
  
    @FieldResolver(() => [PersonTopic_])
    async PersonTopics(@Root() person: Person_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Person Topics', userPayload);
        const sSQL = `SELECT * FROM vwPersonTopics WHERE PersonID=${person.ID} ` + this.getRowLevelSecurityWhereClause('Person Topics', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
      
    @FieldResolver(() => [Purchase_])
    async Purchases(@Root() person: Person_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Purchases', userPayload);
        const sSQL = `SELECT * FROM vwPurchases WHERE PersonID=${person.ID} ` + this.getRowLevelSecurityWhereClause('Purchases', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
    
    @Mutation(() => Person_)
    async CreatePerson(
        @Arg('input', () => CreatePersonInput) input: CreatePersonInput,
        @Ctx() { dataSource, userPayload }: AppContext, 
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeCreate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Persons', this.GetUserFromPayload(userPayload));
            await entityObject.NewRecord();
            entityObject.SetMany(input);
            if (await entityObject.Save()) {
                // save worked, fire the AfterCreate event and then return all the data
                await this.AfterCreate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else 
                // save failed, return null
                return null;
        }
        else    
            return null;
    }

    // Before/After CREATE Event Hooks for Sub-Classes to Override
    protected async BeforeCreate(dataSource: DataSource, input: CreatePersonInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterCreate(dataSource: DataSource, input: CreatePersonInput) {
        const i = input, d = dataSource; // prevent error
    }
    
    @Mutation(() => Person_)
    async UpdatePerson(
        @Arg('input', () => UpdatePersonInput) input: UpdatePersonInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Persons', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for Persons
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdatePersonInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdatePersonInput) {
        const i = input, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for Person Topics
//****************************************************************************
@ViewEntity({
   name: 'vwPersonTopics',
   synchronize: false,
})
@ObjectType()
export class PersonTopic_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field(() => Int) 
    @Column()
    PersonID: number;
      
    @Field(() => Int) 
    @Column()
    TopicID: number;
      
    @Field(() => Int) 
    @Column()
    InterestLevel: number;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
    
}
        
//****************************************************************************
// INPUT TYPE for Person Topics   
//****************************************************************************
@InputType()
export class CreatePersonTopicInput {
    @Field(() => Int, )
    PersonID: number;

    @Field(() => Int, )
    TopicID: number;

    @Field(() => Int, )
    InterestLevel: number;
}

        
//****************************************************************************
// INPUT TYPE for Person Topics   
//****************************************************************************
@InputType()
export class UpdatePersonTopicInput {
    @Field(() => Int, )
    ID: number;

    @Field(() => Int, )
    PersonID: number;

    @Field(() => Int, )
    TopicID: number;

    @Field(() => Int, )
    InterestLevel: number;
}

//****************************************************************************
// RESOLVER for Person Topics
//****************************************************************************
@ObjectType()
export class RunPersonTopicViewResult {
    @Field(() => [PersonTopic_])
    Results: PersonTopic_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(PersonTopic_)
export class PersonTopicResolver extends ResolverBase {
    @Query(() => RunPersonTopicViewResult)
    async RunPersonTopicViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunPersonTopicViewResult)
    async RunPersonTopicViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunPersonTopicViewResult)
    async RunPersonTopicDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Person Topics';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => PersonTopic_, { nullable: true })
    async PersonTopic(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<PersonTopic_ | null> {
        this.CheckUserReadPermissions('Person Topics', userPayload);
        const sSQL = `SELECT * FROM vwPersonTopics WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Person Topics', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }

    @Mutation(() => PersonTopic_)
    async CreatePersonTopic(
        @Arg('input', () => CreatePersonTopicInput) input: CreatePersonTopicInput,
        @Ctx() { dataSource, userPayload }: AppContext, 
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeCreate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Person Topics', this.GetUserFromPayload(userPayload));
            await entityObject.NewRecord();
            entityObject.SetMany(input);
            if (await entityObject.Save()) {
                // save worked, fire the AfterCreate event and then return all the data
                await this.AfterCreate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else 
                // save failed, return null
                return null;
        }
        else    
            return null;
    }

    // Before/After CREATE Event Hooks for Sub-Classes to Override
    protected async BeforeCreate(dataSource: DataSource, input: CreatePersonTopicInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterCreate(dataSource: DataSource, input: CreatePersonTopicInput) {
        const i = input, d = dataSource; // prevent error
    }
    
    @Mutation(() => PersonTopic_)
    async UpdatePersonTopic(
        @Arg('input', () => UpdatePersonTopicInput) input: UpdatePersonTopicInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Person Topics', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for Person Topics
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdatePersonTopicInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdatePersonTopicInput) {
        const i = input, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for Purchases
//****************************************************************************
@ViewEntity({
   name: 'vwPurchases',
   synchronize: false,
})
@ObjectType()
export class Purchase_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field() 
    @MaxLength(3)
    @Column()
    Date: Date;
      
    @Field(() => Int) 
    @Column()
    PersonID: number;
      
    @Field(() => Float) 
    @Column()
    GrandTotal: number;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
      
    @Field() 
    @MaxLength(8)
    @Column()
    UpdatedAt: Date;
    
    @Field(() => [PurchaseDetail_])
    @OneToMany(() => PurchaseDetail_, () => null)
    PurchaseDetails: PurchaseDetail_[]; // Link to PurchaseDetails

}
        
//****************************************************************************
// INPUT TYPE for Purchases   
//****************************************************************************
@InputType()
export class CreatePurchaseInput {
    @Field()
    Date: Date;

    @Field(() => Int, )
    PersonID: number;

    @Field(() => Float, )
    GrandTotal: number;
}

        
//****************************************************************************
// INPUT TYPE for Purchases   
//****************************************************************************
@InputType()
export class UpdatePurchaseInput {
    @Field(() => Int, )
    ID: number;

    @Field()
    Date: Date;

    @Field(() => Int, )
    PersonID: number;

    @Field(() => Float, )
    GrandTotal: number;
}

//****************************************************************************
// RESOLVER for Purchases
//****************************************************************************
@ObjectType()
export class RunPurchaseViewResult {
    @Field(() => [Purchase_])
    Results: Purchase_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(Purchase_)
export class PurchaseResolver extends ResolverBase {
    @Query(() => RunPurchaseViewResult)
    async RunPurchaseViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunPurchaseViewResult)
    async RunPurchaseViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunPurchaseViewResult)
    async RunPurchaseDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Purchases';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => Purchase_, { nullable: true })
    async Purchase(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<Purchase_ | null> {
        this.CheckUserReadPermissions('Purchases', userPayload);
        const sSQL = `SELECT * FROM vwPurchases WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Purchases', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }
  
    @FieldResolver(() => [PurchaseDetail_])
    async PurchaseDetails(@Root() purchase: Purchase_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Purchase Details', userPayload);
        const sSQL = `SELECT * FROM vwPurchaseDetails WHERE PurchaseID=${purchase.ID} ` + this.getRowLevelSecurityWhereClause('Purchase Details', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL);
    }
    
    @Mutation(() => Purchase_)
    async CreatePurchase(
        @Arg('input', () => CreatePurchaseInput) input: CreatePurchaseInput,
        @Ctx() { dataSource, userPayload }: AppContext, 
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeCreate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Purchases', this.GetUserFromPayload(userPayload));
            await entityObject.NewRecord();
            entityObject.SetMany(input);
            if (await entityObject.Save()) {
                // save worked, fire the AfterCreate event and then return all the data
                await this.AfterCreate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else 
                // save failed, return null
                return null;
        }
        else    
            return null;
    }

    // Before/After CREATE Event Hooks for Sub-Classes to Override
    protected async BeforeCreate(dataSource: DataSource, input: CreatePurchaseInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterCreate(dataSource: DataSource, input: CreatePurchaseInput) {
        const i = input, d = dataSource; // prevent error
    }
    
    @Mutation(() => Purchase_)
    async UpdatePurchase(
        @Arg('input', () => UpdatePurchaseInput) input: UpdatePurchaseInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Purchases', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for Purchases
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdatePurchaseInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdatePurchaseInput) {
        const i = input, d = dataSource; // prevent error
    }

}

//****************************************************************************
// ENTITY CLASS for Purchase Details
//****************************************************************************
@ViewEntity({
   name: 'vwPurchaseDetails',
   synchronize: false,
})
@ObjectType()
export class PurchaseDetail_ extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Field(() => Int) 
    @Column()
    PurchaseID: number;
      
    @Field(() => Int) 
    @Column()
    BookID: number;
      
    @Field(() => Float) 
    @Column()
    Quantity: number;
      
    @Field(() => Float) 
    @Column()
    Amount: number;
      
    @Field(() => Float) 
    @Column()
    Discount: number;
      
    @Field(() => Float) 
    @Column()
    Total: number;
      
    @Field() 
    @MaxLength(8)
    @Column()
    CreatedAt: Date;
      
    @Field() 
    @MaxLength(8)
    @Column()
    UpdatedAt: Date;
    
}
        
//****************************************************************************
// INPUT TYPE for Purchase Details   
//****************************************************************************
@InputType()
export class CreatePurchaseDetailInput {
    @Field(() => Int, )
    PurchaseID: number;

    @Field(() => Int, )
    BookID: number;

    @Field(() => Float, )
    Quantity: number;

    @Field(() => Float, )
    Amount: number;

    @Field(() => Float, )
    Discount: number;

    @Field(() => Float, )
    Total: number;
}

        
//****************************************************************************
// INPUT TYPE for Purchase Details   
//****************************************************************************
@InputType()
export class UpdatePurchaseDetailInput {
    @Field(() => Int, )
    ID: number;

    @Field(() => Int, )
    PurchaseID: number;

    @Field(() => Int, )
    BookID: number;

    @Field(() => Float, )
    Quantity: number;

    @Field(() => Float, )
    Amount: number;

    @Field(() => Float, )
    Discount: number;

    @Field(() => Float, )
    Total: number;
}

//****************************************************************************
// RESOLVER for Purchase Details
//****************************************************************************
@ObjectType()
export class RunPurchaseDetailViewResult {
    @Field(() => [PurchaseDetail_])
    Results: PurchaseDetail_[];

    @Field(() => Int, {nullable: true})
    UserViewRunID?: number;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(PurchaseDetail_)
export class PurchaseDetailResolver extends ResolverBase {
    @Query(() => RunPurchaseDetailViewResult)
    async RunPurchaseDetailViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunPurchaseDetailViewResult)
    async RunPurchaseDetailViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunPurchaseDetailViewResult)
    async RunPurchaseDetailDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Purchase Details';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => PurchaseDetail_, { nullable: true })
    async PurchaseDetail(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<PurchaseDetail_ | null> {
        this.CheckUserReadPermissions('Purchase Details', userPayload);
        const sSQL = `SELECT * FROM vwPurchaseDetails WHERE ID=${ID} ` + this.getRowLevelSecurityWhereClause('Purchase Details', userPayload, EntityPermissionType.Read, 'AND');
        return dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {});
    }

    @Mutation(() => PurchaseDetail_)
    async CreatePurchaseDetail(
        @Arg('input', () => CreatePurchaseDetailInput) input: CreatePurchaseDetailInput,
        @Ctx() { dataSource, userPayload }: AppContext, 
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeCreate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Purchase Details', this.GetUserFromPayload(userPayload));
            await entityObject.NewRecord();
            entityObject.SetMany(input);
            if (await entityObject.Save()) {
                // save worked, fire the AfterCreate event and then return all the data
                await this.AfterCreate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else 
                // save failed, return null
                return null;
        }
        else    
            return null;
    }

    // Before/After CREATE Event Hooks for Sub-Classes to Override
    protected async BeforeCreate(dataSource: DataSource, input: CreatePurchaseDetailInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterCreate(dataSource: DataSource, input: CreatePurchaseDetailInput) {
        const i = input, d = dataSource; // prevent error
    }
    
    @Mutation(() => PurchaseDetail_)
    async UpdatePurchaseDetail(
        @Arg('input', () => UpdatePurchaseDetailInput) input: UpdatePurchaseDetailInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        if (await this.BeforeUpdate(dataSource, input)) { // fire event and proceed if it wasn't cancelled
            const entityObject = await new Metadata().GetEntityObject('Purchase Details', this.GetUserFromPayload(userPayload));
            entityObject.LoadFromData(input) // using the input instead of loading from DB because TrackChanges is turned off for Purchase Details
            
            if (await entityObject.Save({ IgnoreDirtyState: true /*flag used because of LoadFromData() call above*/ })) {
                // save worked, fire afterevent and return all the data
                await this.AfterUpdate(dataSource, input); // fire event
                return entityObject.GetAll();
            }
            else
                return null; // save failed, return null
        }
        else
            return null;
    }

    // Before/After UPDATE Event Hooks for Sub-Classes to Override
    protected async BeforeUpdate(dataSource: DataSource, input: UpdatePurchaseDetailInput): Promise<boolean> {
        const i = input, d = dataSource; // prevent error
        return true;
    }
    protected async AfterUpdate(dataSource: DataSource, input: UpdatePurchaseDetailInput) {
        const i = input, d = dataSource; // prevent error
    }

}
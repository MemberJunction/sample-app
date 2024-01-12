import { LogError, Metadata } from '@memberjunction/core';
import { AppContext, Arg, Ctx, Field, InputType, Int, ObjectType, Query, Resolver } from '@memberjunction/server';

@ObjectType()
export class DatasetResultType {
  @Field(() => Int)
  DatasetID: number;

  @Field(() => String)
  DatasetName: string;

  @Field(() => Boolean)
  Success: boolean;

  @Field(() => String)
  Status: string;

  @Field(() => Date)
  LatestUpdateDate: Date;

  @Field(() => String)
  Results: string;
}

@InputType()
export class DatasetItemFilterTypeGQL {
  @Field(() => String)
  ItemCode: string;

  @Field(() => String)
  Filter: string;
}

@Resolver(DatasetResultType)
export class DatasetResolver {
  @Query(() => DatasetResultType)
  async GetDatasetByName(
    @Arg('DatasetName', () => String) DatasetName: string,
    @Ctx() {}: AppContext,
    @Arg('ItemFilters', () => [DatasetItemFilterTypeGQL], { nullable: 'itemsAndList' }) ItemFilters?: DatasetItemFilterTypeGQL[]
  ) {
    try {
      const md = new Metadata();
      const result = await md.GetDatasetByName(DatasetName, ItemFilters);
      if (result) {
        return {
          DatasetID: result.DatasetID,
          DatasetName: result.DatasetName,
          Success: result.Success,
          Status: result.Status,
          LatestUpdateDate: result.LatestUpdateDate,
          Results: JSON.stringify(result.Results),
        };
      } else {
        throw new Error('Error retrieving Dataset: ' + DatasetName);
      }
    } catch (err) {
      LogError(err);
      throw new Error('Error retrieving Dataset: ' + DatasetName + '\n\n' + err);
    }
  }
}

@ObjectType()
export class DatasetStatusResultType {
  @Field(() => Int)
  DatasetID: number;

  @Field(() => String)
  DatasetName: string;

  @Field(() => Boolean)
  Success: boolean;

  @Field(() => String)
  Status: string;

  @Field(() => Date)
  LatestUpdateDate: Date;

  @Field(() => String)
  EntityUpdateDates: string;
}

@Resolver(DatasetStatusResultType)
export class DatasetStatusResolver {
  @Query(() => DatasetStatusResultType)
  async GetDatasetStatusByName(
    @Arg('DatasetName', () => String) DatasetName: string,
    @Ctx() {}: AppContext,
    @Arg('ItemFilters', () => [DatasetItemFilterTypeGQL], { nullable: 'itemsAndList' }) ItemFilters?: DatasetItemFilterTypeGQL[]
  ) {
    try {
      const md = new Metadata();
      const result = await md.GetDatasetStatusByName(DatasetName, ItemFilters);
      if (result) {
        return {
          DatasetID: result.DatasetID,
          DatasetName: result.DatasetName,
          Success: result.Success,
          Status: result.Status,
          LatestUpdateDate: result.LatestUpdateDate,
          EntityUpdateDates: JSON.stringify(result.EntityUpdateDates),
        };
      } else {
        throw new Error('Error retrieving Dataset Status: ' + DatasetName);
      }
    } catch (err) {
      LogError(err);
      throw new Error('Error retrieving Dataset Status: ' + DatasetName + '\n\n' + err);
    }
  }
}

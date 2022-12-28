import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

export class DynamoService<T> {
  protected dynamoClient: DynamoDBClient;
  protected documentClient: DynamoDBDocumentClient;
  protected readonly tableName: string;

  constructor(
    region: string,
    accessKeyId: string,
    secretAccessKey: string,
    tableName: string
  ) {
    this.tableName = tableName;
    this.dynamoClient = new DynamoDBClient({
      region: region,
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      },
    });

    const marshallOptions = {
      // Whether to automatically convert empty strings, blobs, and sets to `null`.
      convertEmptyValues: false, // false, by default.
      // Whether to remove undefined values while marshalling.
      removeUndefinedValues: true, // false, by default.
      // Whether to convert typeof object to map attribute.
      convertClassInstanceToMap: false, // false, by default.
    };

    const unmarshallOptions = {
      // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
      wrapNumbers: false, // false, by default.
    };

    // Create the DynamoDB document client.
    this.documentClient = DynamoDBDocumentClient.from(this.dynamoClient, {
      marshallOptions,
      unmarshallOptions,
    });
  }

  /**
   * Adds item to table.
   * @param item
   */
  async addItem(item: T) {
    const params = {
      TableName: this.tableName,
      Item: {
        item,
      },
    };

    return await this.documentClient.send(new PutCommand(params));
  }
}

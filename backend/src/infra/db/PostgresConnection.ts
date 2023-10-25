import DatabaseConnection from "./DatabaseConnect";
import postgres from 'pg-promise'; 

export default class PostgresConnection implements DatabaseConnection {
  constructor(){
    this.connect();
  }

  private connection: any; 

  async connect(): Promise<void> {
    this.connection = await postgres()("postgres://erp:psd-erp-db@localhost:5432/erp")
  }
  
  async query(statement: string, params: any): Promise<any> {
      return this.connection.query(statement, params)
  }

  async close(): Promise<void> {
    await this.connection.$pool.end()
  }

}
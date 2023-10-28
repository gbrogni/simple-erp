export default interface DatabaseConnection {
	query (statement: string, data: any, transactional: boolean): Promise<any>;
    close(): Promise<void>;
}

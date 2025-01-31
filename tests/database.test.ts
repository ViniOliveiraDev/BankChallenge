import mongoose, {Document, Model, Schema} from 'mongoose';
import connectDB from "../src/database/connectDB";

interface ITestDocument extends Document {
    name: string;
    value: number;
}

// Define a schema for the test collection
const TestSchema: Schema = new Schema({
    name: {type: String, required: true},
    value: {type: Number, required: true},
});

// Create a model for the test collection
const TestModel: Model<ITestDocument> = mongoose.model<ITestDocument>('Test', TestSchema);
describe('Database Connection', () => {
    beforeAll(async () => {
        // Connect to the database before running the tests
        await connectDB();
    });

    afterAll(async () => {
        // Close the database connection after all tests are done
        await mongoose.connection.close();
    });

    it('should connect to the database', async () => {
        expect(mongoose.connection.readyState).toBe(1);
    });
    it('should create a new collection', async () => {
        const collectionName = 'tests';
        await mongoose.connection.createCollection(collectionName);
        const collections = await mongoose.connection?.db?.listCollections().toArray();
        expect(collections?.some((col) => col.name === collectionName)).toBe(true);
    });

    it('should insert data into the collection', async () => {
        const testData = {name: 'Test Document', value: 42};
        const doc = await TestModel.create(testData);

        expect(doc.name).toBe(testData.name);
        expect(doc.value).toBe(testData.value);
    });

    it('should query data from the collection', async () => {
        const doc = await TestModel.findOne({name: 'Test Document'});

        expect(doc).not.toBeNull();
        expect(doc?.name).toBe('Test Document');
        expect(doc?.value).toBe(42);
    });

    it('should remove data from the collection', async () => {
        await TestModel.deleteOne({name: 'Test Document'});

        const doc = await TestModel.findOne({name: 'Test Document'});
        expect(doc).toBeNull();
    });

    it('should drop the collection', async () => {
        const collectionName = 'tests';
        await mongoose.connection?.db?.dropCollection(collectionName);

        const collections = await mongoose.connection?.db?.listCollections().toArray();
        expect(collections?.some((col) => col.name === collectionName)).toBe(false);
    });
});
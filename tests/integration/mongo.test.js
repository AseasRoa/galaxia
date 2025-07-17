import {
  collection,
  connect,
  DocSchema,
  fromSchema,
  model,
  ObjectId
} from 'exports/db/mongo.js'
import { MongoServerError } from 'mongodb'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

describe('mongodb', () => {
  let mongoServer = null

  beforeAll(async() => {
    mongoServer = await MongoMemoryServer.create()
    const uri = mongoServer.getUri()
    await connect(uri)
  })

  afterAll(async() => {
    await mongoServer.stop()
  })

  describe('collection()', () => {
    test('insertOne', async() => {
      const defaultCollection = await collection('db', 'default')
      await defaultCollection.insertOne({ key: 'value' })
      const count = await defaultCollection.countDocuments()

      expect(count).toBe(1)
    })
  })

  describe('model()', () => {
    let PersonModel = null

    beforeAll(() => {
      /** @enum {{ name: string, age: number, sex?: string }} */
      const personSchema = new DocSchema()

      /** @type {personSchema} */
      const personTypeSchema = fromSchema(personSchema)

      PersonModel = model('db', 'person', personTypeSchema)
    })

    test('wrong database and collection', () => {
      // @ts-expect-error
      expect(() => model(123, 'test')).toThrow()
      // @ts-expect-error
      expect(() => model('db', 123)).toThrow()
    })

    test('wrong schema', () => {
      // @ts-expect-error
      expect(() => model('db', 'test')).toThrow()
      expect(() => model('db', 'test', {})).toThrow()
    })

    test('count', async() => {
      await expect(PersonModel.count()).resolves.toBe(0)
    })

    describe('insertOne', () => {
      test('valid', async() => {
        await expect(
          PersonModel.insertOne({ name: 'John', age: 31 })
        ).resolves.toBeInstanceOf(ObjectId)
      })

      test('invalid', async() => {
        await expect(
          async() => await PersonModel.insertOne()
        ).rejects.toThrow()

        await expect(
          async() => await PersonModel.insertOne(123)
        ).rejects.toThrow()

        await expect(
          async() => await PersonModel.insertOne({ name: 'John', age: '31' })
        ).rejects.toThrow()
      })
    })

    describe('insertMany', () => {
      test('valid', async() => {
        let result = await PersonModel.insertMany(
          { name: 'John', age: 31 }
        )
        await expect(result.length).toBe(1)

        result = await PersonModel.insertMany(
          [
            { name: 'John', age: 31 },
            { name: 'John', age: 31 }
          ]
        )
        await expect(result.length).toBe(2)
      })

      test('invalid', async() => {
        await expect(
          async() => await PersonModel.insertMany()
        ).rejects.toThrow()

        await expect(
          async() => await PersonModel.insertMany(123)
        ).rejects.toThrow()

        await expect(
          async() => await PersonModel.insertMany({ name: 'John', age: '31' })
        ).rejects.toThrow()
      })
    })

    describe('updateOne', () => {
      test('valid', async() => {
        await PersonModel.insertOne({ name: 'Jane', age: 28 })
        const result = await PersonModel
          .query({ name: 'Jane' })
          .updateOne({ sex: 'female' })

        expect(result).toMatchObject({
          acknowledged: true,
          modifiedCount: 1,
          upsertedId: null,
          upsertedCount: 0,
          matchedCount: 1
        })
      })
    })

    describe('updateMany', () => {
      test('valid', async() => {
        await PersonModel.insertMany(
          [
            { name: 'Anna', age: 28 },
            { name: 'Anna', age: 27 },
            { name: 'Anna', age: 26 }
          ]
        )
        const result = await PersonModel
          .query({ name: 'Anna' })
          .updateMany({ sex: 'female' })

        expect(result).toMatchObject({
          acknowledged: true,
          modifiedCount: 3,
          upsertedId: null,
          upsertedCount: 0,
          matchedCount: 3
        })
      })
    })

    describe('deleteOne', () => {
      test('valid', async() => {
        await PersonModel.insertMany(
          [
            { name: 'deleteOne', age: 28 },
            { name: 'deleteOne', age: 27 },
            { name: 'deleteOne', age: 26 }
          ]
        )

        const deleteResult = await PersonModel
          .query({ name: 'deleteOne' })
          .deleteOne()

        expect(deleteResult).toMatchObject({
          acknowledged: true,
          deletedCount: 1
        })
      })
    })

    describe('deleteMany', () => {
      test('valid', async() => {
        await PersonModel.insertMany(
          [
            { name: 'deleteMany', age: 28 },
            { name: 'deleteMany', age: 27 },
            { name: 'deleteMany', age: 26 }
          ]
        )

        const deleteResult = await PersonModel
          .query({ name: 'deleteMany' })
          .deleteMany()

        expect(deleteResult).toMatchObject({
          acknowledged: true,
          deletedCount: 3
        })
      })
    })

    describe('ensureIndex', () => {
      test('valid', async() => {
        const indexName = await PersonModel.ensureIndex({ name: 1 })

        await expect(indexName).toBe('name_1')
      })
    })

    describe('indexes', () => {
      test('valid', async() => {
        const indexKey = { name: 1 }
        const indexName = await PersonModel.ensureIndex(indexKey)
        const indexes = await PersonModel.indexes()

        await expect(indexes).toMatchObject([
          { v: 2, key: { _id: 1 }, name: '_id_' },
          { v: 2, key: indexKey, name: indexName }
        ])
      })
    })

    describe('dropIndex', () => {
      test('valid', async() => {
        let result = null

        const indexName = await PersonModel.ensureIndex({ name: 1 })
        result = await PersonModel.dropIndex(indexName)
        await expect(result).toBe(true)

        await PersonModel.ensureIndex({ age: 1 })
        result = await PersonModel.dropIndex({ age: 1 })
        await expect(result).toBe(true)
      })

      test('invalid', async() => {
        await expect(
          async() => await PersonModel.dropIndex('doesNotExist')
        ).rejects.toThrow(MongoServerError)
      })
    })
  })
})

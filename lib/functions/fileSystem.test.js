/* eslint-disable vitest/no-conditional-expect */

import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import fileSystem from './fileSystem.js'

const outputDir = path.join(os.tmpdir(), 'galaxia-test-dir')

describe('File System Functions', () => {
  beforeEach(() => {
    // Cleanup
    fs.rmSync(outputDir, { force: true, recursive: true })
    // Ensure main dir
    fs.mkdirSync(outputDir, { recursive: true })
  })

  afterEach(() => {
    // Cleanup
    fs.rmSync(outputDir, { force: true, recursive: true })
  })

  describe('Dirs', () => {
    test('should throw an error when path is invalid', () => {
      if (process.platform === 'win32') {
        // Characters \ and / are also invalid for a file name,
        // but part of dir paths
        const forbiddenCharacters = ':*?"<>|'.split('')

        for (const symbol of forbiddenCharacters) {
          expect(() => {
            fileSystem.ensureDirSync(path.join(outputDir, symbol))
          }).toThrow(Error)
        }
      }
    })

    test('isDir()', async() => {
      const file = path.join(outputDir, 'test.txt')

      await fileSystem.ensureFile(file)

      expect(await fileSystem.isDir(outputDir)).toBe(true)
      expect(await fileSystem.isDir(outputDir, 'not-there')).toBe(false)
      expect(await fileSystem.isDir(file)).toBe(false)
    })

    test('isDirSync()', () => {
      const file = path.join(outputDir, 'test.txt')

      fileSystem.ensureFileSync(file)

      expect(fileSystem.isDirSync(outputDir)).toBe(true)
      expect(fileSystem.isDirSync(outputDir, 'not-there')).toBe(false)
      expect(fileSystem.isDirSync(file)).toBe(false)
    })

    test('dirExists()', async() => {
      // Existing dir
      expect(await fileSystem.dirExists(outputDir)).toBe(true)
      // Non-existent dir
      expect(await fileSystem.dirExists(outputDir, 'not-there')).toBe(false)
    })

    test('dirExistsSync()', () => {
      // Existing dir
      expect(fileSystem.dirExistsSync(outputDir)).toBe(true)
      // Non-existent dir
      expect(fileSystem.dirExistsSync(outputDir, 'not-there')).toBe(false)
    })

    test('ensureDir()', async() => {
      // Try over existing directory
      await fileSystem.ensureDir(outputDir)

      // Try with new directory
      const dir = path.join(outputDir, 'dir')

      expect(await fileSystem.dirExists(dir)).toBe(false)

      fileSystem.ensureDirSync(dir)

      expect(await fileSystem.dirExists(dir)).toBe(true)
    })

    test('ensureDirSync(()', () => {
      // Try over existing directory
      fileSystem.ensureDirSync(outputDir)

      // Try with new directory
      const dir = path.join(outputDir, 'dir')

      expect(fileSystem.dirExistsSync(dir)).toBe(false)

      fileSystem.ensureDirSync(dir)

      expect(fileSystem.dirExistsSync(dir)).toBe(true)
    })

    test('isDirEmpty()', async() => {
      expect(await fileSystem.isDirEmpty(outputDir)).toBe(true)

      await fileSystem.ensureDir(outputDir, 'dir')

      expect(await fileSystem.isDirEmpty(outputDir)).toBe(false)
    })

    test('isDirEmptySync()', () => {
      expect(fileSystem.isDirEmptySync(outputDir)).toBe(true)

      fileSystem.ensureDirSync(outputDir, 'dir')

      expect(fileSystem.isDirEmptySync(outputDir)).toBe(false)
    })

    test('isDirEmpty() extended scenario', async() => {
      // Create some dirs with dirs in them, and some files
      for (let number = 1; number <= 10; number++) {
        const dirLevelOne = path.join(outputDir, number.toString())
        const dirLevelTwo = path.join(dirLevelOne, 'dirname')

        await fileSystem.ensureDir(dirLevelOne)
        await fileSystem.ensureDir(dirLevelTwo)
      }

      // Just in case, check if the dir is now not empty
      expect(await fileSystem.isDirEmpty(outputDir)).toBe(false)

      // Now try to delete all created dirs
      await fileSystem.emptyDir(outputDir)

      // And finally check if the dir is empty
      expect(await fileSystem.isDirEmpty(outputDir)).toBe(true)

      // File instead of dir
      const file = path.join(outputDir, 'file.ext')

      await fileSystem.ensureFile(file)

      await expect(async() => {
        await fileSystem.isDirEmpty(file)
      }).rejects.toThrow(Error)
    })

    test('isDirEmptySync() extended scenario', () => {
      // Create some dirs with dirs in them, and some files
      for (let number = 1; number <= 10; number++) {
        const dirLevelOne = path.join(outputDir, number.toString())
        const dirLevelTwo = path.join(dirLevelOne, 'dirname')

        fileSystem.ensureDirSync(dirLevelOne)
        fileSystem.ensureDirSync(dirLevelTwo)
      }

      // Just in case, check if the dir is now not empty
      expect(fileSystem.isDirEmptySync(outputDir)).toBe(false)

      // Now try to delete all created dirs
      fileSystem.emptyDirSync(outputDir)

      // And finally check if the dir is empty
      expect(fileSystem.isDirEmptySync(outputDir)).toBe(true)

      // File instead of dir
      const file = path.join(outputDir, 'file.ext')

      fileSystem.ensureFileSync(file)

      expect(() => {
        fileSystem.isDirEmptySync(file)
      }).toThrow(Error)
    })

    test('dirStats()', async() => {
      // Existing dir
      const stats = await fileSystem.dirStats(outputDir)

      expect(stats instanceof Object).toBe(true)

      // Non-existent dir
      await expect(async() => {
        await fileSystem.dirStats(outputDir, 'not-there')
      }).rejects.toThrow(Error)

      // File instead of dir
      const file = path.join(outputDir, 'file.ext')

      await fileSystem.ensureFile(file)

      await expect(async() => {
        await fileSystem.dirStats(file)
      }).rejects.toThrow(Error)
    })

    test('dirStatsSync()', () => {
      // Existing dir
      const stats = fileSystem.dirStatsSync(outputDir)

      expect(stats instanceof Object).toBe(true)

      // Non-existent dir
      expect(() => {
        fileSystem.dirStatsSync(outputDir, 'not-there')
      }).toThrow(Error)

      // File instead of dir
      const file = path.join(outputDir, 'file.ext')

      fileSystem.ensureFileSync(file)

      expect(() => {
        fileSystem.dirStatsSync(file)
      }).toThrow(Error)
    })

    test('readDir()', async() => {
      let contents = await fileSystem.readDir(outputDir)

      expect(contents.length).toBe(0)

      await fileSystem.ensureDir(outputDir, 'new-dir')
      await fileSystem.ensureFile(outputDir, 'new-file')

      contents = await fileSystem.readDir(outputDir)

      expect(contents).toStrictEqual(['new-dir', 'new-file'])
    })

    test('readDirSync()', () => {
      let contents = fileSystem.readDirSync(outputDir)

      expect(contents.length).toBe(0)

      fileSystem.ensureDirSync(outputDir, 'new-dir')
      fileSystem.ensureFileSync(outputDir, 'new-file')

      contents = fileSystem.readDirSync(outputDir)

      expect(contents).toStrictEqual(['new-dir', 'new-file'])
    })

    test('remove() directory', async() => {
      await fileSystem.ensureDir(outputDir, 'new-dir')
      await fileSystem.ensureFile(outputDir, 'new-file')

      expect(await fileSystem.dirExists(outputDir)).toBe(true)

      await fileSystem.remove(outputDir)

      expect(await fileSystem.dirExists(outputDir)).toBe(false)
    })

    test('removeSync() directory', () => {
      fileSystem.ensureDirSync(outputDir, 'new-dir')
      fileSystem.ensureFileSync(outputDir, 'new-file')

      expect(fileSystem.dirExistsSync(outputDir)).toBe(true)

      fileSystem.removeSync(outputDir)

      expect(fileSystem.dirExistsSync(outputDir)).toBe(false)
    })

    test(
      'dirMtimeDeep()',
      async() => {
        // Check the main dir
        const stat = await fileSystem.dirStats(outputDir)

        expect(
          (await fileSystem.dirMtimeDeep(outputDir)).getTime()
        ).toBe(
          stat.mtime.getTime()
        )

        // Check internal dir
        const dir = path.join(outputDir, 'some-dir')

        await fileSystem.ensureDir(dir)

        expect(
          (await fileSystem.dirMtimeDeep(outputDir)).getTime()
        ).toBe(
          (await fileSystem.dirStats(dir)).mtime.getTime()
        )

        // File in the internal dir
        const file = path.join(dir, 'some-file.txt')

        await fileSystem.ensureFile(file)

        expect(
          (await fileSystem.dirMtimeDeep(outputDir)).getTime()
        ).toBe(
          (await fileSystem.fileStats(file)).mtime.getTime()
        )
      }
    )

    test(
      'dirMtimeDeepSync()',
      () => {
        // Check the main dir
        const stat = fileSystem.dirStatsSync(outputDir)

        expect(
          (fileSystem.dirMtimeDeepSync(outputDir)).getTime()
        ).toBe(
          stat.mtime.getTime()
        )

        // Check internal dir
        const dir = path.join(outputDir, 'some-dir')

        fileSystem.ensureDirSync(dir)

        expect(
          (fileSystem.dirMtimeDeepSync(outputDir)).getTime()
        ).toBe(
          (fileSystem.dirStatsSync(dir)).mtime.getTime()
        )

        // File in the internal dir
        const file = path.join(dir, 'some-file.txt')

        fileSystem.ensureFileSync(file)

        expect(
          (fileSystem.dirMtimeDeepSync(outputDir)).getTime()
        ).toBe(
          (fileSystem.fileStatsSync(file)).mtime.getTime()
        )
      }
    )
  })

  describe('Files', () => {
    test('fileExists()', async() => {
      const file = path.join(outputDir, 'file.txt')

      expect(await fileSystem.fileExists(file)).toBe(false)

      await fileSystem.writeFile(file, 'data')

      expect(await fileSystem.fileExists(file)).toBe(true)
    })

    test('fileExistsSync()', () => {
      const file = path.join(outputDir, 'fileSync.txt')

      expect(fileSystem.fileExistsSync(file)).toBe(false)

      fileSystem.writeFileSync(file, 'data')

      expect(fileSystem.fileExistsSync(file)).toBe(true)
    })

    test('isFile()', async() => {
      const file = path.join(outputDir, 'test.txt')

      await fileSystem.ensureFile(file)

      expect(await fileSystem.isFile(outputDir)).toBe(false)
      expect(await fileSystem.isFile(outputDir, 'not-there')).toBe(false)
      expect(await fileSystem.isFile(file)).toBe(true)
    })

    test('isFileSync()', () => {
      const file = path.join(outputDir, 'test.txt')

      fileSystem.ensureFileSync(file)

      expect(fileSystem.isFileSync(outputDir)).toBe(false)
      expect(fileSystem.isFileSync(outputDir, 'not-there')).toBe(false)
      expect(fileSystem.isFileSync(file)).toBe(true)
    })

    test('ensureFile(), readFile(), writeFile()', async() => {
      // Check if new empty file is being created
      const fileOne = path.join(outputDir, 'fileOne.txt')

      await fileSystem.ensureFile(fileOne)
      expect(await fileSystem.fileExists(fileOne)).toBe(true)

      // Check that when file is ensured, it is not modified
      const fileTwo = path.join(outputDir, 'fileTwo.txt')

      await fileSystem.writeFile(fileTwo, 'fileTwoContents')
      await fileSystem.ensureFile(fileTwo)
      expect(
        (await fileSystem.readFile(fileTwo)).toString()
      ).toBe(
        'fileTwoContents'
      )
    })

    test('ensureFileSync(), readFileSync(), writeFileSync()', () => {
      // Check if new empty file is being created
      const fileOne = path.join(outputDir, 'fileOne.txt')

      fileSystem.ensureFileSync(fileOne)
      expect(fileSystem.fileExistsSync(fileOne)).toBe(true)

      // Check that when file is ensured, it is not modified
      const fileTwo = path.join(outputDir, 'fileTwo.txt')

      fileSystem.writeFileSync(fileTwo, 'fileTwoContents')
      fileSystem.ensureFileSync(fileTwo)
      expect(
        (fileSystem.readFileSync(fileTwo)).toString()
      ).toBe(
        'fileTwoContents'
      )
    })

    test('fileSize()', async() => {
      const file = path.join(outputDir, 'test.txt')

      // Non-existent file
      await expect(
        async() => fileSystem.fileSize(file)
      ).rejects.toThrow(Error)

      // Existing file
      await fileSystem.writeFile(file, 'some data')

      expect(await fileSystem.fileSize(file)).toBe(9)

      // Directory, instead of a file
      await expect(
        async() => fileSystem.fileSize(outputDir)
      ).rejects.toThrow(Error)
    })

    test('fileSizeSync()', () => {
      const file = path.join(outputDir, 'test.txt')

      // Non-existent file
      expect(
        () => fileSystem.fileSizeSync(file)
      ).toThrow(Error)

      // Existing file
      fileSystem.writeFileSync(file, 'some data')

      expect(fileSystem.fileSizeSync(file)).toBe(9)

      // Directory, instead of a file
      expect(
        () => fileSystem.fileSizeSync(outputDir)
      ).toThrow(Error)
    })

    test('fileStats()', async() => {
      const file = path.join(outputDir, 'test.json')

      await fileSystem.writeFile(file, 'hello')

      const stats = await fileSystem.fileStats(file)

      expect(stats instanceof Object).toBe(true)

      // Dir instead of file
      await expect(async() => {
        await fileSystem.fileStats(outputDir)
      }).rejects.toThrow(Error)
    })
  })

  test('fileStatsSync()', () => {
    const file = path.join(outputDir, 'test.json')

    fileSystem.writeFileSync(file, 'hello')

    const stats = fileSystem.fileStatsSync(file)

    expect(stats instanceof Object).toBe(true)

    // Dir instead of file
    expect(() => {
      fileSystem.fileStatsSync(outputDir)
    }).toThrow(Error)
  })

  describe('JSON files', () => {
    test('readJson(), writeJson()', async() => {
      const file = path.join(outputDir, 'test.json')

      // Non-existent file
      await expect(
        async() => fileSystem.readJson(file)
      ).rejects.toThrow(Error)

      await fileSystem.writeJson(file, { hello: 'world' })
      expect((await fileSystem.readJson(file)).hello).toBe( 'world')
    })

    test('readJsonSync(), writeJsonSync()', () => {
      const file = path.join(outputDir, 'test.json')

      // Non-existent file
      expect(
        () => fileSystem.readJsonSync(file)
      ).toThrow(Error)

      fileSystem.writeJsonSync(file, { hello: 'world' })
      expect((fileSystem.readJsonSync(file)).hello).toBe('world')
    })

    test('readJson5(), writeJson5()', async() => {
      const file = path.join(outputDir, 'test.json')

      // Non-existent file
      await expect(
        async() => fileSystem.readJson5(file)
      ).rejects.toThrow(Error)

      await fileSystem.writeJson5(file, { hello: 'world' })
      expect((await fileSystem.readJson5(file)).hello).toBe('world')
    })

    test('readJson5Sync(), writeJson5Sync()', () => {
      const file = path.join(outputDir, 'test.json')

      // Non-existent file
      expect(
        () => fileSystem.readJson5Sync(file)
      ).toThrow(Error)

      fileSystem.writeJson5Sync(file, { hello: 'world' })
      expect((fileSystem.readJson5Sync(file)).hello).toBe('world')
    })

    test('remove file', async() => {
      const file = path.join(outputDir, 'test.json')

      await fileSystem.ensureFile(file)

      expect(await fileSystem.fileExists(file)).toBe(true)

      await fileSystem.remove(file)

      expect(await fileSystem.fileExists(file)).toBe(false)
    })

    test('remove file sync', () => {
      const file = path.join(outputDir, 'test.json')

      fileSystem.ensureFileSync(file)

      expect(fileSystem.fileExistsSync(file)).toBe(true)

      fileSystem.removeSync(file)

      expect(fileSystem.fileExistsSync(file)).toBe(false)
    })
  })

  describe('Path validation', () => {
    test('throws on invalid path (win32 only)', async() => {
      if (process.platform === 'win32') {
        await expect(async() => {
          await fileSystem.ensureDir(outputDir, '<>')
        }).rejects.toThrow(Error)

        await expect(async() => {
          await fileSystem.writeFile(outputDir, ':')
        }).rejects.toThrow(Error)
      }
    })

    test('throws on invalid path sync (win32 only)', () => {
      if (process.platform === 'win32') {
        expect(() => {
          fileSystem.ensureDirSync(outputDir, '?')
        }).toThrow(Error)

        expect(() => {
          fileSystem.writeFileSync(outputDir, '*')
        }).toThrow(Error)
      }
    })
  })
})

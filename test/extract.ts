import test from 'ava'
import fs from 'node:fs/promises'
import ts from 'typescript'
import { join } from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
const __dirname = fileURLToPath(dirname(import.meta.url))

test('extra inline styles', async (t) => {
  console.log('hello')

  // const tsAst = recast.parse(source, {
  // parser: require("recast/parsers/typescript")
  // });

  /*
import * as ts from "typescript";

const filename = "test.ts";
const code = `const test: number = 1 + 2;`;

const sourceFile = ts.createSourceFile(
    filename, code, ts.ScriptTarget.Latest
);

function printRecursiveFrom(
  node: ts.Node, indentLevel: number, sourceFile: ts.SourceFile
) {
  const indentation = "-".repeat(indentLevel);
  const syntaxKind = ts.SyntaxKind[node.kind];
  const nodeText = node.getText(sourceFile);
  console.log(`${indentation}${syntaxKind}: ${nodeText}`);

  node.forEachChild(child =>
      printRecursiveFrom(child, indentLevel + 1, sourceFile)
  );
}

printRecursiveFrom(sourceFile, 0, sourceFile);
  */

  const file = join(__dirname, '../../test/examples/index.txt')
  const content = await fs.readFile(file)
  // const program = ts.createProgram([file], {
  //   jsx: 2,
  // })

  let result = content.toString()
  let x = result.split('')

  const sourceFile = ts.createSourceFile(
    file,
    result,
    ts.ScriptTarget.ESNext,
    false,
    ts.ScriptKind.TSX,
  )

  const walk = (
    node: any,
    indentLevel: number = 0,
    inStyle: boolean = false,
  ) => {
    const indentation = '-'.repeat(indentLevel)
    const syntaxKind = ts.SyntaxKind[node.kind]
    // const nodeText = node.getText(sourceFile)
    console.log(
      `${indentation}${syntaxKind}:`,
      // content.toString().slice(node.pos, node.end),
    )

    if (
      node.kind === ts.SyntaxKind.JsxAttribute &&
      node.name &&
      node.name.escapedText === 'style'
    ) {
      console.log(node)
    }

    // JsxAttribute
    if (node.kind === ts.SyntaxKind.JsxOpeningElement) {
      if (node.tagName?.expression?.escapedText === 'styled') {
        inStyle = true
        console.log('go')
      }
    }

    if (inStyle) {
      if (node.kind === ts.SyntaxKind.ObjectLiteralExpression) {
        if (node.properties) {
          for (let i = 0; i < node.properties.length; i++) {
            const prop = node.properties[i]
            if (prop.name && prop.initializer) {
              if (
                prop.initializer.kind === ts.SyntaxKind.StringLiteral ||
                prop.initializer.kind === ts.SyntaxKind.FirstLiteralToken
              ) {
                if (i < node.properties.length - 1) {
                  const next = node.properties[i + 1]
                  for (let j = prop.pos; j < next.pos; j++) {
                    x[j] = ''
                  }
                } else {
                  for (let j = prop.pos; j < node.end - 1; j++) {
                    x[j] = ''
                  }
                }
              }
            }
          }
        }
        return
      }
    }

    if (node.moduleSpecifier && node.moduleSpecifier.text === 'inlines') {
      console.log('HELLO')
    } else {
      for (const key in node) {
        if (key === 'parent') continue
        if (typeof node[key] === 'object') {
          walk(node[key], indentLevel + 1, inStyle)
        }
      }
      // walk(node)
    }
  }

  ts.forEachChild(sourceFile, walk)

  console.log(x.join(''))

  // await fs.writeFile(
  //   join(__dirname, '../../test/examples/bla.js'),
  //   result.outputText,
  // )

  // const ast = recast.parse(result.outputText)
  // console.info(ast)

  t.true(true)
})

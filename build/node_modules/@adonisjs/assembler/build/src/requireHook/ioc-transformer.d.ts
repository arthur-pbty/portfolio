import type tsStatic from 'typescript';
/**
 * Transformer to transform AdonisJS IoC container import
 * statements
 */
export default function (ts: typeof tsStatic, appRoot: string): (ctx: tsStatic.TransformationContext) => (sourceFile: tsStatic.SourceFile) => tsStatic.SourceFile;

// This file is generated by scripts/generate-ast-converters.js.
// Do not edit this file directly.

import type * as estree from 'estree';
import type { AstNode } from '../rollup/types';
import { FIXED_STRINGS } from './convert-ast-strings';
import { error, logParseError } from './logs';

export const ANNOTATION_KEY = '_rollupAnnotations';
export const INVALID_ANNOTATION_KEY = '_rollupRemoved';

export function convertProgram(buffer: ArrayBuffer, readString: ReadString): ProgramNode {
	return convertNode(0, new Uint32Array(buffer), readString);
}

/* eslint-disable sort-keys */
const nodeConverters: ((position: number, buffer: Uint32Array, readString: ReadString) => any)[] = [
	function parseError(position, buffer, readString): never {
		const pos = buffer[position++];
		const message = convertString(position, buffer, readString);
		error(logParseError(message, pos));
	},
	function arrayExpression(position, buffer, readString): ArrayExpressionNode {
		const start = buffer[position++];
		const end = buffer[position++];
		const elements = convertNodeList(position, buffer, readString);
		return {
			type: 'ArrayExpression',
			start,
			end,
			elements
		};
	},
	function arrayPattern(position, buffer, readString): ArrayPatternNode {
		const start = buffer[position++];
		const end = buffer[position++];
		const elements = convertNodeList(position, buffer, readString);
		return {
			type: 'ArrayPattern',
			start,
			end,
			elements
		};
	},
	function arrowFunctionExpression(position, buffer, readString): ArrowFunctionExpressionNode {
		const start = buffer[position++];
		const end = buffer[position++];
		const flags = buffer[position++];
		const async = (flags & 1) === 1;
		const expression = (flags & 2) === 2;
		const generator = (flags & 4) === 4;
		const parameters = convertNodeList(buffer[position++], buffer, readString);
		const body = convertNode(buffer[position++], buffer, readString);
		const annotations = convertAnnotations(position, buffer);
		return {
			type: 'ArrowFunctionExpression',
			start,
			end,
			async,
			expression,
			generator,
			...(annotations.length > 0 ? { [ANNOTATION_KEY]: annotations } : {}),
			params: parameters,
			body,
			id: null
		};
	},
	function assignmentExpression(position, buffer, readString): AssignmentExpressionNode {
		const start = buffer[position++];
		const end = buffer[position++];
		const operator = FIXED_STRINGS[buffer[position++]] as estree.AssignmentOperator;
		const right = convertNode(buffer[position++], buffer, readString);
		const left = convertNode(position, buffer, readString);
		return {
			type: 'AssignmentExpression',
			start,
			end,
			operator,
			left,
			right
		};
	},
	function assignmentPattern(position, buffer, readString): AssignmentPatternNode {
		const start = buffer[position++];
		const end = buffer[position++];
		const right = convertNode(buffer[position++], buffer, readString);
		const left = convertNode(position, buffer, readString);
		return {
			type: 'AssignmentPattern',
			start,
			end,
			left,
			right
		};
	},
	function binaryExpression(position, buffer, readString): BinaryExpressionNode {
		const start = buffer[position++];
		const end = buffer[position++];
		const operator = FIXED_STRINGS[buffer[position++]] as estree.BinaryOperator;
		const right = convertNode(buffer[position++], buffer, readString);
		const left = convertNode(position, buffer, readString);
		return {
			type: 'BinaryExpression',
			start,
			end,
			operator,
			left,
			right
		};
	},
	function breakStatement(position, buffer, readString): BreakStatementNode {
		const start = buffer[position++];
		const end = buffer[position++];
		const labelPosition = buffer[position];
		const label = labelPosition === 0 ? null : convertNode(labelPosition, buffer, readString);
		return {
			type: 'BreakStatement',
			start,
			end,
			label
		};
	},
	function callExpression(position, buffer, readString): CallExpressionNode {
		const start = buffer[position++];
		const end = buffer[position++];
		const flags = buffer[position++];
		const optional = (flags & 1) === 1;
		const callee = convertNode(buffer[position++], buffer, readString);
		const arguments_ = convertNodeList(buffer[position++], buffer, readString);
		const annotations = convertAnnotations(position, buffer);
		return {
			type: 'CallExpression',
			start,
			end,
			optional,
			...(annotations.length > 0 ? { [ANNOTATION_KEY]: annotations } : {}),
			callee,
			arguments: arguments_
		};
	},
	function directive(position, buffer, readString): DirectiveNode {
		const start = buffer[position++];
		const end = buffer[position++];
		const expression = convertNode(buffer[position++], buffer, readString);
		const directive = convertString(position, buffer, readString);
		return {
			type: 'ExpressionStatement',
			start,
			end,
			directive,
			expression
		};
	},
	function expressionStatement(position, buffer, readString): ExpressionStatementNode {
		const start = buffer[position++];
		const end = buffer[position++];
		const expression = convertNode(position, buffer, readString);
		return {
			type: 'ExpressionStatement',
			start,
			end,
			expression
		};
	},
	function identifier(position, buffer, readString): IdentifierNode {
		const start = buffer[position++];
		const end = buffer[position++];
		const name = convertString(position, buffer, readString);
		return {
			type: 'Identifier',
			start,
			end,
			name
		};
	},
	function ifStatement(position, buffer, readString): IfStatementNode {
		const start = buffer[position++];
		const end = buffer[position++];
		const consequent = convertNode(buffer[position++], buffer, readString);
		const alternatePosition = buffer[position++];
		const alternate =
			alternatePosition === 0 ? null : convertNode(alternatePosition, buffer, readString);
		const test = convertNode(position, buffer, readString);
		return {
			type: 'IfStatement',
			start,
			end,
			test,
			consequent,
			alternate
		};
	},
	function literalBoolean(position, buffer): LiteralBooleanNode {
		const start = buffer[position++];
		const end = buffer[position++];
		const flags = buffer[position++];
		const value = (flags & 1) === 1;
		return {
			type: 'Literal',
			start,
			end,
			value,
			raw: value ? 'true' : 'false'
		};
	},
	function literalNumber(position, buffer, readString): LiteralNumberNode {
		const start = buffer[position++];
		const end = buffer[position++];
		const rawPosition = buffer[position++];
		const raw = rawPosition === 0 ? undefined : convertString(rawPosition, buffer, readString);
		const value = new DataView(buffer.buffer).getFloat64(position << 2, true);
		return {
			type: 'Literal',
			start,
			end,
			raw,
			value
		};
	},
	function literalString(position, buffer, readString): LiteralStringNode {
		const start = buffer[position++];
		const end = buffer[position++];
		const rawPosition = buffer[position++];
		const raw = rawPosition === 0 ? undefined : convertString(rawPosition, buffer, readString);
		const value = convertString(position, buffer, readString);
		return {
			type: 'Literal',
			start,
			end,
			value,
			raw
		};
	},
	function logicalExpression(position, buffer, readString): LogicalExpressionNode {
		const start = buffer[position++];
		const end = buffer[position++];
		const operator = FIXED_STRINGS[buffer[position++]] as estree.LogicalOperator;
		const right = convertNode(buffer[position++], buffer, readString);
		const left = convertNode(position, buffer, readString);
		return {
			type: 'LogicalExpression',
			start,
			end,
			operator,
			left,
			right
		};
	},
	function memberExpression(position, buffer, readString): MemberExpressionNode {
		const start = buffer[position++];
		const end = buffer[position++];
		const flags = buffer[position++];
		const computed = (flags & 1) === 1;
		const optional = (flags & 2) === 2;
		const property = convertNode(buffer[position++], buffer, readString);
		const object = convertNode(position, buffer, readString);
		return {
			type: 'MemberExpression',
			start,
			end,
			computed,
			optional,
			object,
			property
		};
	},
	function program(position, buffer, readString): ProgramNode {
		const start = buffer[position++];
		const end = buffer[position++];
		const annotations = convertAnnotations(buffer[position++], buffer);
		const body = convertNodeList(position, buffer, readString);
		return {
			type: 'Program',
			start,
			end,
			body,
			...(annotations.length > 0 ? { [INVALID_ANNOTATION_KEY]: annotations } : {}),
			sourceType: 'module'
		};
	},
	function variableDeclaration(position, buffer, readString): VariableDeclarationNode {
		const start = buffer[position++];
		const end = buffer[position++];
		const kind = FIXED_STRINGS[buffer[position++]] as estree.VariableDeclaration['kind'];
		const declarations = convertNodeList(position, buffer, readString);
		return {
			type: 'VariableDeclaration',
			start,
			end,
			kind,
			declarations
		};
	},
	function variableDeclarator(position, buffer, readString): VariableDeclaratorNode {
		const start = buffer[position++];
		const end = buffer[position++];
		const initPosition = buffer[position++];
		const init = initPosition === 0 ? null : convertNode(initPosition, buffer, readString);
		const id = convertNode(position, buffer, readString);
		return {
			type: 'VariableDeclarator',
			start,
			end,
			id,
			init
		};
	}
];

type ReadString = (start: number, length: number) => string;
export type AnnotationType = 'pure' | 'noSideEffects';

export interface RollupAnnotation {
	start: number;
	end: number;
	type: AnnotationType;
}

export type ArrayExpressionNode = estree.ArrayExpression & AstNode;
export type ArrayPatternNode = estree.ArrayPattern & AstNode;
export type ArrowFunctionExpressionNode = estree.ArrowFunctionExpression &
	AstNode & { [ANNOTATION_KEY]?: RollupAnnotation[] } & { id: null };
export type AssignmentExpressionNode = estree.AssignmentExpression & AstNode;
export type AssignmentPatternNode = estree.AssignmentPattern & AstNode;
export type BinaryExpressionNode = estree.BinaryExpression & AstNode;
export type BreakStatementNode = estree.BreakStatement & AstNode;
export type CallExpressionNode = estree.CallExpression &
	AstNode & { [ANNOTATION_KEY]?: RollupAnnotation[] };
export type DirectiveNode = estree.Directive & AstNode;
export type ExpressionStatementNode = estree.ExpressionStatement & AstNode;
export type IdentifierNode = estree.Identifier & AstNode;
export type IfStatementNode = estree.IfStatement & AstNode;
export type LiteralBooleanNode = estree.SimpleLiteral & AstNode;
export type LiteralNumberNode = estree.SimpleLiteral & AstNode;
export type LiteralStringNode = estree.SimpleLiteral & AstNode;
export type LogicalExpressionNode = estree.LogicalExpression & AstNode;
export type MemberExpressionNode = estree.MemberExpression & AstNode;
export type ProgramNode = estree.Program &
	AstNode & { [INVALID_ANNOTATION_KEY]?: RollupAnnotation[] } & { sourceType: 'module' };
export type VariableDeclarationNode = estree.VariableDeclaration & AstNode;
export type VariableDeclaratorNode = estree.VariableDeclarator & AstNode;

function convertNode(position: number, buffer: Uint32Array, readString: ReadString): any {
	const nodeType = buffer[position];
	const converter = nodeConverters[nodeType];
	/* istanbul ignore if: This should never be executed but is a safeguard against faulty buffers */
	if (!converter) {
		console.trace();
		throw new Error(`Unknown node type: ${nodeType}`);
	}
	return converter(position + 1, buffer, readString);
}

function convertNodeList(position: number, buffer: Uint32Array, readString: ReadString): any[] {
	const length = buffer[position++];
	const list: any[] = [];
	for (let index = 0; index < length; index++) {
		const nodePosition = buffer[position++];
		list.push(nodePosition ? convertNode(nodePosition, buffer, readString) : null);
	}
	return list;
}

const convertAnnotations = (position: number, buffer: Uint32Array): RollupAnnotation[] => {
	const length = buffer[position++];
	const list: any[] = [];
	for (let index = 0; index < length; index++) {
		list.push(convertAnnotation(buffer[position++], buffer));
	}
	return list;
};

const convertAnnotation = (position: number, buffer: Uint32Array): RollupAnnotation => {
	const start = buffer[position++];
	const end = buffer[position++];
	const type = FIXED_STRINGS[buffer[position]] as AnnotationType;
	return { end, start, type };
};

const convertString = (position: number, buffer: Uint32Array, readString: ReadString): string => {
	const length = buffer[position++];
	const bytePosition = position << 2;
	return readString(bytePosition, length);
};

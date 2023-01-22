import React from 'react';
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeReact from "rehype-react";
import { visit } from "unist-util-visit";

export const parse = async (content: string) => {
  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeReact, { createElement: React.createElement });
  return (await processor.parse(content));
};

export const parseToRun = async (content: string) => {
  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeReact, { createElement: React.createElement });
  return (await processor.run(processor.parse(content)));
};

export const markdownToRehypeReact = async (content: string) => {
  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeReact, { createElement: React.createElement });
  return processor.stringify(await processor.run(processor.parse(content)));
};

// processor.process = stringify <- run <- parse(content)
export const markdownToReactComponent = async (content: string) => {
  const processor = unified()
    .use(remarkParse)
    .use(allHeadingLevelToTwo)
    .use(remarkRehype)
    .use(afterRehypePlugin)
    .use(debugTree)
    .use(rehypeReact, { createElement: React.createElement });
  return (await processor.process(content));
}

export const allHeadingLevelToTwo: any = () => {
  const transformer = (tree: any) => {
    visit(tree, (node) => {
      console.log('allHeadingLevelToTwo - node', node);
      if (node.type === 'heading') {
        node.depth = 2;
      }
    });
  };

  return transformer;
}

export const afterRehypePlugin: any = () => {
  const transformer = (tree: any) => {
    visit(tree, (node) => {
      console.log('afterRehypePlugin - node', node);
      if (node.type === 'element') {
        const tempProperties = node.properties || {};
        node.properties = {
          ...tempProperties,
          className: 'foo',
        };
      }
    });
  };

  return transformer;
}

export const debugTree: any = () => {
  const transformer = (tree: any) => {
    visit(tree, (node) => {
      console.log('Debug - node', node);
    });
  };

  return transformer;
}
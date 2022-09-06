import React from 'react';
import {StyleProp, Text, TextProps, TextStyle} from 'react-native';
import {findAll} from 'highlight-words-core';

interface HighlighterProps extends TextProps {
    autoEscape?: boolean | undefined;
    highlightStyle?: StyleProp<TextStyle>;
    sanitize?: ((text: string) => string) | undefined;
    searchWords: string[];
    textToHighlight: string;
}

/**
 * Highlights all occurrences of search terms (searchText) within a string (textToHighlight).
 * This function returns an array of strings and <Text> elements (wrapping highlighted words).
 */
export default function Highlighter({
                                        autoEscape,
                                        highlightStyle,
                                        searchWords,
                                        textToHighlight,
                                        sanitize,
                                        ...props
                                    }: HighlighterProps) {
    const chunks = findAll({textToHighlight, searchWords, sanitize, autoEscape});

    return (
      <Text {...props}>
          {chunks.map((chunk, index) => {
              const text = textToHighlight.substr(chunk.start, chunk.end - chunk.start);

              return (!chunk.highlight)
                ? text
                : (
                  <Text
                    key={index}
                    style={chunk.highlight && highlightStyle}
                  >
                      {text}
                  </Text>
                );
          })}
      </Text>
    );
}

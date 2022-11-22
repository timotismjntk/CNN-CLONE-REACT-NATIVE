import React, {useMemo} from 'react';
import {Appearance, StyleSheet} from 'react-native';
import {RichEditor} from 'react-native-pell-rich-editor';

import {color} from '../../utils/theme';
import {windowHeight} from '../../utils';

export default function TextEditor({
  richTextRef,
  initialContentHTML,
  onChange,
}) {
  const theme = Appearance.getColorScheme();

  const contentStyle = useMemo(() => {
    if (theme === 'light') {
      return {
        backgroundColor: '#fff',
        color: '#000033',
        caretColor: color,
        placeholderColor: '#a9a9a9',
        // cssText: '#editor {background-color: #f3f3f3}', // initial valid
        contentCSSText: 'font-size: 16px;', // initial valid
      };
    }
    return {
      backgroundColor: '#2e3847',
      color: '#fff',
      caretColor: color,
      placeholderColor: 'gray',
      // cssText: '#editor {background-color: #f3f3f3}', // initial valid
      contentCSSText: 'font-size: 16px;', // initial valid
    };
  }, [theme]);

  return (
    <RichEditor
      ref={richTextRef}
      style={styles.container}
      initialContentHTML={initialContentHTML}
      onChange={descriptionText => {
        onChange.setContent(descriptionText);
        onChange.setIsSaved(true);
      }}
      useContainer={true}
      pasteAsPlainText={true}
      placeholder={'Tulis Catatan'}
      editorStyle={contentStyle}
      initialHeight={windowHeight * 0.7}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '1%',
  },
});

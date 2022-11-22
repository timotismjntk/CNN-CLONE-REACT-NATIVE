import React, {useState, useRef} from 'react';
import {useEffect} from 'react';
import {View} from 'react-native';
import {actions, RichToolbar} from 'react-native-pell-rich-editor';
import Toast from 'react-native-toast-message';

// import components
import AddImage from './AddImage';
import AddVideo from './AddVideo';
import AddYoutube from './AddYoutube';
import InsertLink from './InsertLink';

export default function Toolbar({richTextRef}) {
  const [openModalFoto, setOpenModalFoto] = useState({
    status: false,
    response: '',
  });
  const [openModalVideo, setOpenModalVideo] = useState({
    status: false,
    response: '',
  });
  const [openModalYoutube, setOpenModalYoutube] = useState({
    status: false,
    response: '',
  });
  const [openModalInsertLink, setOpenModalInsertLink] = useState({
    status: false,
    response: {},
  });

  useEffect(() => {
    if (openModalFoto?.response?.length > 0) {
      richTextRef.current?.insertImage(
        openModalFoto?.response,
        'background: gray;',
      );
      setOpenModalFoto({
        status: false,
        response: '',
      });
    }
  }, [openModalFoto, richTextRef]);

  useEffect(() => {
    if (openModalVideo?.response?.length > 0) {
      richTextRef.current?.insertVideo(
        openModalVideo?.response,
        'width: 98%; height=220;',
      );
      setOpenModalVideo({
        status: false,
        response: '',
      });
    }
  }, [openModalVideo, richTextRef]);

  useEffect(() => {
    if (openModalInsertLink?.response?.length > 0) {
      richTextRef.current?.insertLink(
        openModalInsertLink?.response?.title,
        openModalInsertLink?.response?.url,
      );
      setOpenModalInsertLink({
        status: false,
        response: {},
      });
    }
  }, [openModalInsertLink, richTextRef]);

  useEffect(() => {
    if (openModalYoutube?.response?.length > 0) {
      const filteredChar = [
        'https://youtu.be/',
        'http://youtu.be/',
        'https//www.youtube.com/',
        'http://www.youtube.com/',
        'https://youtube.com/',
        'http://youtube.com/',
        'https://m.youtube.com/',
        'http://m.youtube.com/',
        'youtube.com/',
        'www.youtube.com/',
        'm.youtube.com/',
        'youtu.be/',
      ];
      const find = filteredChar.find(link =>
        openModalYoutube?.response?.includes(link),
      );
      if (find) {
        const embedIdYoutube = openModalYoutube?.response?.replace(find, '');
        richTextRef.current?.insertHTML(
          `<div style="padding:10px 0;">
                <iframe  width="98%" height="220"  src="https://www.youtube.com/embed/${embedIdYoutube}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>`,
        );
        setOpenModalYoutube({
          status: false,
          response: {},
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Gagal',
          text2: 'url video youtube tidak valid',
        });
      }
    }
  }, [openModalYoutube, richTextRef]);

  return (
    <View>
      <RichToolbar
        editor={richTextRef}
        actions={[
          actions.undo,
          actions.redo,
          actions.insertImage,
          actions.insertVideo,
          'insertYoutube',
          actions.insertLink,
          actions.setBold,
          actions.setUnderline,
          actions.setItalic,
          actions.insertBulletsList,
          actions.insertOrderedList,
          actions.keyboard,
          actions.setStrikethrough,
          actions.checkboxList,
        ]}
        iconMap={{
          insertYoutube: require('../../assets/youtube.png'),
        }}
        insertYoutube={() =>
          setOpenModalYoutube(prev => ({...prev, status: true}))
        }
        onPressAddImage={() =>
          setOpenModalFoto(prev => ({...prev, status: true}))
        }
        insertVideo={() => setOpenModalVideo(prev => ({...prev, status: true}))}
        onInsertLink={() =>
          setOpenModalInsertLink(prev => ({...prev, status: true}))
        }
      />
      <AddImage open={openModalFoto.status} fn={setOpenModalFoto} />
      <AddVideo open={openModalVideo.status} fn={setOpenModalVideo} />
      <AddYoutube open={openModalYoutube.status} fn={setOpenModalYoutube} />
      <InsertLink
        open={openModalInsertLink.status}
        fn={setOpenModalInsertLink}
      />
    </View>
  );
}

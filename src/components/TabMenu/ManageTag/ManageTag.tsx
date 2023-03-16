import { useRef, FormEvent } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import uuid4 from 'uuid4';
import { AMain } from 'recoil/atom';
import { SOpen } from 'recoil/selector';
import { ModalLayout } from 'components/Modal/Layout/ModalLayout';
import { IoIosClose as DeleteTagIcon } from 'react-icons/io';
import styles from './ManageTag.module.scss';

export const ManageTag = () => {
  const tagFormRef = useRef<HTMLFormElement>(null);
  const [savedTagGroup, setSavedTagGroup] = useRecoilState(
    AMain.savedTagGroupState
  );
  const setCloseTagPopup = useSetRecoilState(SOpen.toggleModalSelector);

  const handleDeleteTag = (id: string) => {
    setSavedTagGroup((savedTagGroup) =>
      savedTagGroup.filter(({ id: index }) => index !== id)
    );
  };

  const handleSubmitTag = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const tag = formData.get('tag') as string;

    if (tag.length < 1) return;

    setSavedTagGroup([...savedTagGroup, { id: uuid4(), name: tag }]);

    if (tagFormRef.current) {
      tagFormRef.current.reset();
    }
  };

  return (
    <>
      <ModalLayout role='tagModal'>
        <div className={styles.tagGroup}>
          {savedTagGroup.map(({ id, name }) => {
            return (
              <div key={id} className={styles.tagWrap}>
                <div
                  className={styles.tag}
                  onClick={() => setCloseTagPopup('tagPopup')}
                >
                  {name}
                </div>
                <div
                  className={styles.deleteTagIcon}
                  onClick={() => handleDeleteTag(id)}
                >
                  <DeleteTagIcon />
                </div>
              </div>
            );
          })}
        </div>
        <form
          className={styles.inputForm}
          ref={tagFormRef}
          onSubmit={handleSubmitTag}
        >
          <input name='tag' placeholder='태그' autoFocus />
        </form>
      </ModalLayout>
    </>
  );
};
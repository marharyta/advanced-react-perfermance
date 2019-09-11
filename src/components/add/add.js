import React, { useState, lazy, Suspense } from 'react';
import { navigate } from '@reach/router';
import uuid from 'uuid/v4';
import slugify from 'slugify';
import { useUser } from '../../context/user';
import { useShamecaps } from '../../context/shamecaps';
import { LANGUAGES, TYPES } from '../../constants';
import Layout from '../layout/layout';
import Select from '../select/select';
// import CodeMirror from './codemirror';

const CodeMirror = lazy(() =>
  import('./codemirror' /* webpackChunkName: "code-mirror" */)
);

import './add.scss';

const Add = () => {
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [type, setType] = useState(TYPES[0]);
  const [code, setCode] = useState('');
  const { user } = useUser();
  const { createShamecap } = useShamecaps();

  const handleSubmit = event => {
    event.preventDefault();

    const [prettierCode, setPrettierCode] = useState('');
    Promise.all([
      import('prettier/standalone' /* webpackChunkName: "prettier" */),
      import('prettier/parser-graphql' /* webpackChunkName: "prettier-parser-graphql"  */),
      import('prettier/parser-babylon' /* webpackChunkName: "prettier-parser-babylon"  */),
      import('prettier/parser-markdown' /* webpackChunkName:  "prettier-parser-markdown" */)
    ]).then(([prettier, ...plugins]) => {
      let prettierCode;
      try {
        setPrettierCode(
          prettier.format(code, {
            parser: language === 'javascript' ? 'babel' : language,
            plugins
          })
        );
      } catch {
        setPrettierCode(code);
      }
    });

    const data = {
      id: uuid(),
      title,
      language: slugify(language, { lower: true }),
      type: slugify(type, { lower: true }),
      code: code.trim(),
      created: Date.now(),
      user: { name: user.name }
    };

    createShamecap(data);
    navigate('/?language=all&type=all', { state: { created: true } });
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit} className="add-form">
        <h1 className="add-heading">It happened again, didn’t it?</h1>
        <p>You’re among friends, @{user.name}. Unburden your soul.</p>
        <fieldset>
          <legend className="screen-reader-text">Details</legend>
          <div className="details-wrapper">
            <label>
              Title
              <input
                type="text"
                name="title"
                onChange={e => setTitle(e.target.value)}
              />
            </label>
            <Select
              label="Language"
              options={LANGUAGES}
              handleChange={e => setLanguage(e.target.value)}
            />
            <Select
              label="Type"
              options={TYPES}
              handleChange={e => setType(e.target.value)}
            />
          </div>
        </fieldset>
        <Suspense fallback={<p>oppps</p>}>
          <CodeMirror onChange={c => setPrettierCode(c)} />
        </Suspense>

        <button type="submit" className="submit-button">
          Share Your Shame
        </button>
      </form>
    </Layout>
  );
};

export default Add;

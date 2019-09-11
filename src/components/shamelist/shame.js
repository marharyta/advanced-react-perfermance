import React from 'react';
import { Link } from '@reach/router';
// remove top level
// import prettier from 'prettier/standalone';
//import moment from 'moment';
import { formatDistance } from 'date-fns';
import Code from './code';
import Controls from './controls';

// tree shaking
// we need to only use
// loading from actual functions file so that
// we do not download the entire lib

// like a lodash

// es6 supports tree shaking

export default ({
  id,
  language,
  code,
  user,
  title,
  showUserDetails,
  created,
  showControls,
  deleteShamecap
}) => {
  return (
    <section className="shame-wrapper">
      <div className="shame">
        <div className="terminal">
          <Controls />
          <Code language={language} code={code} />
        </div>
      </div>
      <h3 className="title">{title}</h3>
      {showUserDetails && (
        <span className="details">
          Posted by{' '}
          <Link to={`/${user.name}`} state={{ username: user.displayName }}>
            @{user.name}
          </Link>{' '}
          {formatDistance(created, Date.now(), { addSuffix: true })}
        </span>
      )}
      {showControls && (
        <span className="details">
          <button onClick={() => deleteShamecap(id)} className="delete-button">
            delete this shamecap
          </button>
        </span>
      )}
    </section>
  );
};

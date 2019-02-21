
/* IMPORT */

import * as is from 'electron-is';
import * as React from 'react';
import {connect} from 'overstated';
import Main from '@renderer/containers/main';
import KeyedTree from '@renderer/components/main/structures/keyed_tree';
import Tags, {TagSpecials} from '@renderer/utils/tags';
import Tag from './tag';

const {ALL, FAVORITES, NOTEBOOKS, TAGS, TEMPLATES, UNTAGGED, TRASH} = TagSpecials;

/* HELPERS */

const getHeight = () => is.macOS () ? window.innerHeight - 38 : window.innerHeight, //UGLY: But it gets the job done, quickly
      getItemChildren = tag => !tag.collapsed ? Tags.sort ( Object.values ( tag.tags ) ) : [],
      getItemKey = item => item.path,
      filterItem = item => !!item.notes.length || item.path === ALL;

/* CONTENT */

const Content = ({ isLoading, all, favorites, notebooks, tags, templates, untagged, trash }) => {

  if ( isLoading ) return null;

  let data = [all, favorites, notebooks, tags, templates, untagged, trash];

  if ( !notebooks.notes.length && !templates.notes.length ) data.splice ( 3, 1, ...Tags.sort ( Object.values ( tags.tags ) ) ); // If this is the only nestable special tag, avoid using it

  return <KeyedTree id="list-tags" className="layout-content" data={data} getHeight={getHeight} getItemChildren={getItemChildren} getItemKey={getItemKey} filterItem={filterItem}>{Tag}</KeyedTree>;

};

/* EXPORT */

export default connect ({
  container: Main,
  selector: ({ container }) => ({
    isLoading: container.loading.get (),
    all: container.tag.get ( ALL ),
    favorites: container.tag.get ( FAVORITES ),
    notebooks: container.tag.get ( NOTEBOOKS ),
    tags: container.tag.get ( TAGS ),
    templates: container.tag.get ( TEMPLATES ),
    untagged: container.tag.get ( UNTAGGED ),
    trash: container.tag.get ( TRASH )
  })
})( Content );

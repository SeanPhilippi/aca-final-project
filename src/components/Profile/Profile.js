import React, { PureComponent } from 'react';
import './Profile.css';
import CommentColumn from '../CommentColumn/CommentColumn';
import Description from '../Description/Description';
import SaveDelete from '../SaveDelete/SaveDelete';
import SortableList from '../SortableList/SortableList';
import Search from '../Search/Search';

class Profile extends PureComponent {

  render() {

    return (
      <div className="profile-wrapper" >
        <div className="main-container bg-lighter mt-4">
          <div className="left-col bg-white">
            <div className="search-btns-container">
              <SaveDelete />
              <Search />
            </div>
            <SortableList />
            <Description />
          </div>
          <div className="right-col">
            <CommentColumn className="comments" />
          </div>
        </div>
      </div >
    );
  }
}

export default Profile;

import React from "react";
import classes from "./ProfileImagePreview.module.scss";
import classNames from "classnames";

interface ProfileImagePreviewProps {
  imageUrl: string;
}

const ProfileImagePreview = ({ imageUrl }: ProfileImagePreviewProps) => {
  return (
    <div>
      <p>Image Preview</p>
      {imageUrl ? (
        <img
          className={classNames(classes.Image)}
          src={imageUrl}
          alt="Image Preview"
        />
      ) : (
        <p className={classNames(classes.NoImage)}>No image to display</p>
      )}
    </div>
  );
};

export default ProfileImagePreview;

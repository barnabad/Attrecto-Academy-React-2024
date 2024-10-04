import React, { useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Page } from "../../components/page/Page";
import { UserFormValues, UserModel } from "../../models/user.model";
import { BadgeModel } from "../../models/badges.model";
import TextField from "../../components/text-field/TextField";
import ProfileImagePreview from "../../components/ProfileImagePreview/ProfileImagePreview";

const schema = Yup.object({
  name: Yup.string().required(),
  image: Yup.string().required(),
});

export const UserPage = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<UserModel>();
  const [badges, setBadges] = useState<BadgeModel[]>([]);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<UserFormValues>({
    defaultValues: {
      name: "",
      image: "",
    },
    resolver: yupResolver(schema),
  });

  const imageUrl = watch("image");

  return (
    <Page title={user ? user.name : "User"}>
      <form>
        <TextField
          name="name"
          label="Name"
          register={register}
          error={errors.name?.message}
        />
        <TextField
          name="image"
          label="Avatar url"
          register={register}
          error={errors.image?.message}
        />
      </form>
      <ProfileImagePreview imageUrl={imageUrl} />
    </Page>
  );
};

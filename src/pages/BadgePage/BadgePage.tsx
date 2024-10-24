import { useEffect, useState } from "react";
import { Page } from "../../components/page/Page";
import { useNavigate, useParams } from "react-router-dom";
import { badgesService } from "../../services/badges.service";
import { BadgeFormValues, BadgeModel } from "../../models/badges.model";
import TextField from "../../components/text-field/TextField";
import { useForm } from "react-hook-form";
import { Button } from "../../components/button/Button";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const BadgePage = () => {
  const [badge, setBadge] = useState<BadgeModel>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBadge = async (badgeId: string | number) => {
      const res = await badgesService.getBadge(badgeId);
      setBadge(res);
    };

    if (id) fetchBadge(id);
  }, [id]);

  const schema = Yup.object({
    name: Yup.string().required(),
    description: Yup.string().required(),
    image: Yup.string().required(),
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<BadgeFormValues>({
    defaultValues: {
      name: "",
      description: "",
      image: "",
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset({
      name: badge?.name,
      image: badge?.image,
      description: badge?.description,
    });
  }, [reset, badge?.name, badge?.image, badge?.description]);

  const onSubmit = async (values: BadgeFormValues) => {
    if (badge?.id) {
      await badgesService.updateBadge(badge.id, values);
    } else {
      await badgesService.createBadge(values);
    }
    goToBadgesPage();
  };

  const goToBadgesPage = () => {
    navigate("/badges");
  };

  return (
    <Page title={badge ? badge.name : "Badge"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          name="name"
          label="Name"
          register={register}
          error={errors.name?.message}
        />

        <TextField
          name="description"
          label="Badge description"
          register={register}
          error={errors.description?.message}
        />

        <TextField
          name="image"
          label="Image url"
          register={register}
          error={errors.image?.message}
        />

        <div className="mt-3">
          <Button
            color="secondary"
            type="button"
            className="me-2"
            onClick={goToBadgesPage}
          >
            Back
          </Button>
          <Button type="submit" color="primary">
            {id ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Page>
  );
};

export default BadgePage;

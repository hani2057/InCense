import React, { useEffect, useState } from "react";
import { ProfileOutletContainer } from "../ProfilePage/style";
import ProfileTitleBox from "../../../components/Profile/ProfileTitleBox/ProfileTitleBox";
import { ProfileActivityItemContainer } from "./style";
import api from "../../../apis/api";
import ReviewItem from "../../../components/Profile/ReviewItem/ReviewItem";

const ProfileActivityPage = () => {
  const [reviews, setReviews] = useState(null);

  const fetchGetReviews = async () => {
    const res = await api.profile.getUserReviews();
    setReviews(res);
  };

  useEffect(() => {
    fetchGetReviews();
  }, []);

  if (!reviews) return null;

  return (
    <ProfileOutletContainer>
      <ProfileTitleBox bgimgNo={1} title={"PERFUME REVIEWS"} />
      <ProfileActivityItemContainer>
        {reviews.map(
          ({ time, brandName, perfumeName, preference, comment, reviewId }) => (
            <ReviewItem
              // img={image}
              createdAt={time}
              brand={brandName}
              name={perfumeName}
              preference={preference}
              review={comment}
              reviewId={reviewId}
              key={reviewId}
            />
          )
        )}
      </ProfileActivityItemContainer>

      <ProfileTitleBox
        bgimgNo={1}
        title={"MY WRITINGS"}
        subtitle={"SHARE&SELL"}
      />
      <ProfileTitleBox
        bgimgNo={1}
        title={"BOOKMARKS"}
        subtitle={"SHARE&SELL"}
      />
    </ProfileOutletContainer>
  );
};

export default ProfileActivityPage;

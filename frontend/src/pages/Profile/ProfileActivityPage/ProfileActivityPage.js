import React, { useEffect, useState } from "react";
import { ProfileOutletContainer } from "../ProfilePage/style";
import ProfileTitleBox from "../../../components/Profile/ProfileTitleBox/ProfileTitleBox";
import { ProfileActivityItemContainer } from "./style";
import api from "../../../apis/api";
import ReviewItem from "../../../components/Profile/ReviewItem/ReviewItem";
import ShareItem from "../../../components/Profile/ShareItem/ShareItem";

const ProfileActivityPage = () => {
  const [reviews, setReviews] = useState(null);
  const [shareWritings, setShareWritings] = useState(null);
  const [shareBookmarks, setShareBookmarks] = useState(null);

  const fetchGetReviews = async () => {
    const res = await api.profile.getUserReviews();
    setReviews(res);
  };

  const fetchGetShareWritings = async () => {
    const res = await api.profile.getUserArticles();
    setShareWritings(res);
  };

  const fetchGetShareBookmarks = async () => {
    const res = await api.profile.getUserBookmarks();
    setShareBookmarks(res);
  };

  useEffect(() => {
    fetchGetReviews();
    fetchGetShareWritings();
    fetchGetShareBookmarks();
  }, []);

  if (!reviews) return null;

  return (
    <ProfileOutletContainer>
      <ProfileTitleBox bgimgNo={1} title={"PERFUME REVIEWS"} />
      <ProfileActivityItemContainer>
        {reviews.map(
          ({
            time,
            brandName,
            perfumeName,
            preference,
            comment,
            reviewId,
            perfumeId,
            perfumeImage,
          }) => (
            <ReviewItem
              img={perfumeImage}
              createdAt={time}
              brand={brandName}
              name={perfumeName}
              preference={preference}
              review={comment}
              reviewId={reviewId}
              perfumeId={perfumeId}
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
      <ProfileActivityItemContainer>
        <ShareItem isMine={true} />
      </ProfileActivityItemContainer>

      <ProfileTitleBox
        bgimgNo={1}
        title={"BOOKMARKS"}
        subtitle={"SHARE&SELL"}
      />
      <ProfileActivityItemContainer>
        <ShareItem />
      </ProfileActivityItemContainer>
    </ProfileOutletContainer>
  );
};

export default ProfileActivityPage;

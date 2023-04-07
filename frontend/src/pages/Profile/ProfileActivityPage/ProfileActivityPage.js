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

  // 유저가 작성한 후기 가져오기
  const fetchGetReviews = async () => {
    const res = await api.profile.getUserReviews();
    setReviews(res);
  };

  // 유저가 작성한 나눔판매글 가져오기
  const fetchGetShareWritings = async () => {
    const res = await api.profile.getUserArticles();
    setShareWritings(res);
  };

  // 유저가 북마크한 나눔판매글 가져오기
  const fetchGetShareBookmarks = async () => {
    const res = await api.profile.getUserBookmarks();
    setShareBookmarks(res);
  };

  useEffect(() => {
    fetchGetReviews();
    fetchGetShareWritings();
    fetchGetShareBookmarks();
  }, []);

  if (!reviews || !shareWritings || !shareBookmarks) return null;

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
              fetchGetReviews={fetchGetReviews}
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
        {shareWritings.map(
          ({
            commentCount,
            date,
            dealId,
            gubun,
            image,
            isClosed,
            isDelivery,
            perfumeBrandName,
            perfumeName,
            price,
            title,
            volume,
            // nickname,
          }) => (
            <ShareItem
              isMine={true}
              commentCount={commentCount}
              createdAt={date}
              dealId={dealId}
              gubun={gubun}
              img={image}
              isClosed={isClosed}
              isDelivery={isDelivery}
              brand={perfumeBrandName}
              name={perfumeName}
              price={price}
              title={title}
              volume={volume}
              key={dealId}
            />
          )
        )}
      </ProfileActivityItemContainer>

      <ProfileTitleBox
        bgimgNo={1}
        title={"BOOKMARKS"}
        subtitle={"SHARE&SELL"}
      />
      <ProfileActivityItemContainer>
        {shareBookmarks.map(
          ({
            commentCount,
            date,
            dealId,
            gubun,
            image,
            isClosed,
            isDelivery,
            perfumeBrandName,
            perfumeName,
            price,
            title,
            volume,
            nickname,
          }) => (
            <ShareItem
              commentCount={commentCount}
              createdAt={date}
              dealId={dealId}
              gubun={gubun}
              img={image}
              isClosed={isClosed}
              isDelivery={isDelivery}
              brand={perfumeBrandName}
              name={perfumeName}
              price={price}
              title={title}
              volume={volume}
              nickname={nickname}
              key={dealId}
            />
          )
        )}
      </ProfileActivityItemContainer>
    </ProfileOutletContainer>
  );
};

export default ProfileActivityPage;

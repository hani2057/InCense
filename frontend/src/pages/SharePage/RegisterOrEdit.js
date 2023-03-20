import React from "react";

const RegisterOrEdit = (props) => {
  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <form enctype="multipart/form-data" onSubmit={props.handleSubmit}>
        <br/>
        <div style={{ maxWidth: "700px", margin: "2rem" }}>
          <label>제목 :</label>
          <br></br>
          <input onChange={props.handleRegisterChange}
            value={props.titleValue} type='text' name='title'/>
          <hr></hr>
            <textarea onChange={props.handleRegisterChange}
            value={props.contentValue} name='content'/>
          <hr></hr>
          {/* <PictureUploader2 formData={props.formData}/> */}
          {/* <input type='file'>파일2</input> */}
        </div>
        <input onChange={props.onImageHandler} type="file" name="picture" 
        accept="image/*,audio/*,video/mp4,video/x-m4v,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,.csv"/>
        <button onClick={props.handleSubmit}>
          {props.updateRequest ? "수정" : "등록"}
        </button>
      </form>

    </div>
  )
};

export default RegisterOrEdit;

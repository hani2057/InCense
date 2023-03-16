package com.suyang.incense.api.service.deal;

import java.io.IOException;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface DealPhotoService {

  boolean saveImage(Long dealId, List<MultipartFile> multipartFiles) throws IOException;

}

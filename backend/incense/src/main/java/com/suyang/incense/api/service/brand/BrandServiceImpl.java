package com.suyang.incense.api.service.brand;

import com.suyang.incense.db.entity.perfume.Brand;
import com.suyang.incense.db.repository.brand.BrandRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class BrandServiceImpl implements BrandService{
    private final BrandRepository brandRepository;
    @Override
    public List<Brand> searchBrandList() {

        return brandRepository.getBrandList();
    }

    @Override
    public List<Brand> searchNotInBrandList(List<Long> brandList){
        return brandRepository.getNotInBrandList(brandList);
    }
}

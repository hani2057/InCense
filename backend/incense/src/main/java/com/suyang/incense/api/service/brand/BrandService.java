package com.suyang.incense.api.service.brand;

import com.suyang.incense.db.entity.perfume.Brand;

import java.util.List;

public interface BrandService {
    public List<Brand> searchBrandList();

    public List<Brand> searchNotInBrandList(List<Long> brandList);
}

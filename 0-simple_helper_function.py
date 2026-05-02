#!/usr/bin/env python3
"""
Pagination üçün index diapazonunu hesablayan köməkçi funksiya.
"""
from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """
    Səhifə nömrəsi və ölçüsünə görə start və end index-ləri qaytarır.
    """
    start_index = (page - 1) * page_size
    end_index = page * page_size
    return (start_index, end_index)

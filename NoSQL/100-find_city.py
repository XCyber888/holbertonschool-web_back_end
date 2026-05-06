#!/usr/bin/env python3
""" 100-find_city module """


def list_all_city(mongo_collection, name_beginning):
    """ Returns a list of all documents where name starts with name_beginning """
    # ^ simvolu "ilə başlayan" mənasına gəlir
    return list(mongo_collection.find({"name": {"$regex": "^{}".format(name_beginning)}}))

import React from 'react';
import { config } from '../../../Config';

const BookDetails = ({ loading, onClose, book }) => {
  return (
    <div>
        {book.bookName ?
        <div className="p-4">
          <p className="text-lg font-bold">Book Name</p>
          <p className="text-gray-700">{book.bookName}</p>
        </div>
        : null }

        {book.rackId ?
        <div className="p-4">
          <p className="text-lg font-bold">Rack Room Name</p>
          <p className="text-gray-700">{book?.rackId?.roomName}</p>
        </div>
        : null }

        {book.rackId ?
        <div className="p-4">
          <p className="text-lg font-bold">Rack Cabinet Number</p>
          <p className="text-gray-700">{book?.rackId?.cabinetNumber}</p>
        </div>
        : null }rackNumber

        {book.rackId ?
        <div className="p-4">
          <p className="text-lg font-bold">Rack Number</p>
          <p className="text-gray-700">{book?.rackId?.rackNumber}</p>
        </div>
        : null }

        {book.themeTitle ?
        <div className="p-4">
          <p className="text-lg font-bold">Theme</p>
          <p className="text-gray-700">{book.themeTitle}</p>
        </div>
        : null }

        {book.categoryName ?
        <div className="p-4">
          <p className="text-lg font-bold">Category</p>
          <p className="text-gray-700">{book.categoryName}</p>
        </div>
        : null }

        {book.subcategoryId ?
        <div className="p-4">
          <p className="text-lg font-bold">Subcategory</p>
          <p className="text-gray-700">{book.subcategoryId.categoryName}</p>
        </div>
        : null }

        {book.bookNumber ?
        <div className="p-4">
          <p className="text-lg font-bold">Book Number</p>
          <p className="text-gray-700">{book.bookNumber}</p>
        </div>
        : null }

        {book.autherName ?
        <div className="p-4">
          <p className="text-lg font-bold">Auther Name</p>
          <p className="text-gray-700">{book.autherName}</p>
        </div>
        : null }

        {book.publisherName ?
        <div className="p-4">
          <p className="text-lg font-bold">Published By</p>
          <p className="text-gray-700">{book.publisherName}</p>
        </div>
        : null }

        {book.publishedDate ?
        <div className="p-4">
          <p className="text-lg font-bold">Published Date</p>
          <p className="text-gray-700">{book.publishedDate}</p>
        </div>
        : null }

        {book.urlLink ?
        <div className="p-4">
          <p className="text-lg font-bold">Url Link</p>
          <p className="text-gray-700"><a href={book.urlLink} target="_blank">{book.urlLink}</a></p>
        </div>
        : null }

        {book.numberOfCopies ?
        <div className="p-4">
          <p className="text-lg font-bold">No Of Copies</p>
          <p className="text-gray-700">{book.numberOfCopies}</p>
        </div>
        : null }

        {book.bookDescription ?
        <div className="p-4">
          <p className="text-lg font-bold">Book Description</p>
          <p className="text-gray-700">{book.bookDescription}</p>
        </div>
        : null }

        {book.coverImage ?
        <div className="p-4">
          <p className="text-lg font-bold">Cover Image</p>
          <img src={config.API_BASE_URL+book.coverImage} alt="Book cover image" />
        </div>
        : null }
    </div>
  );
};

export default BookDetails;
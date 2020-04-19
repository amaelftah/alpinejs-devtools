export function flattenData(data) {
  let flattenedData = [];

  for (var key in data) {
    flattenSingleAttribute(flattenedData, key, data[key].value, data[key].type);
  }

  return flattenedData;
}

function mapDataTypeToInputType(dataType) {
    switch(dataType) {
        case 'boolean': return 'checkbox';
        case 'number': return 'number';
        case 'string':
        default:
            return 'text';
    }
}

export function flattenSingleAttribute(
  flattenedData,
  attributeName,
  value,
  type,
  margin = 0,
  id = "",
  directParentId = '',
) {
  let generatedId = id ? id : attributeName;

  flattenedData.push({
    attributeName: attributeName,
    attributeValue: Array.isArray(value)
      ? "Array"
      : value instanceof Object
      ? "Object"
      : value,
    editAttributeValue: Array.isArray(value)
      ? "Array"
      : value instanceof Object
      ? "Object"
      : value,
    depth: margin,
    hasArrow: value instanceof Object,
    readOnly: type === 'function',
    inputType: mapDataTypeToInputType(type),
    id: generatedId,
    inEditingMode: false,
    isOpened : id.length == 0,
    isArrowDown : false,
    directParentId: directParentId
  });

  if (Array.isArray(value)) {
    margin = margin + 10;

    for (var index in value) {

      flattenSingleAttribute(
        flattenedData,
        index,
        value[index],
        typeof value,
        margin,
        (id ? id : attributeName) + "*" + index,
        id ? id : attributeName
      );
    }
  } else if (value instanceof Object) {
    margin = margin + 10;

    for (var objectKey in value) {
      flattenSingleAttribute(
        flattenedData,
        objectKey,
        value[objectKey],
        typeof value[objectKey],
        margin,
        (id ? id : attributeName) + "*" + objectKey,
        id ? id : attributeName

      );
    }
  }
}

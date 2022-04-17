import re
import zipfile
from io import BytesIO
from os import path
from typing import List

from app.models.project_models import TextDocument
from fastapi import HTTPException, UploadFile, status
from pdfminer.high_level import extract_text


def createDocument(content: str, name: str) -> TextDocument:
    text = TextDocument(name=name, value=content)
    return text


def handlePdf(file: bytes, name: str) -> TextDocument:
    content = extract_text(BytesIO(file))
    content = re.sub('\s\s+', ' ', content)
    return createDocument(content, name)


async def handleZip(file: bytes) -> List[TextDocument]:
    result = list()
    fileIo = BytesIO(file)
    with zipfile.ZipFile(fileIo) as archive:
        for filename in archive.namelist():
            name, file_ext = path.splitext(filename)
            content = archive.read(filename)
            result.extend(await checkExtensios(content, name, file_ext))
    return result


async def checkExtensios(file: bytes, name: str, extension: str) -> List[TextDocument]:
    result = list()
    if(extension == ".txt"):
        result.append(createDocument(file, name))
    elif(extension == ".pdf"):
        result.append(handlePdf(file, name))
    elif(extension == ".zip"):
        result.extend(await handleZip(file))
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"{extension} files are not allowed"
        )
    return result


async def handleFile(file: UploadFile) -> List[TextDocument]:
    name, file_ext = path.splitext(file.filename)
    content = await file.read()
    return await checkExtensios(content, name, file_ext)

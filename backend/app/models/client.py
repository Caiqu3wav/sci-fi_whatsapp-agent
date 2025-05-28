from sqlalchemy import Column, String, DateTime, Boolean, ForeignKey, Enum, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from sqlalchemy.ext.declarative import declarative_base
from app.enums.enums import RoleEnum, UserStatusEnum

Base = declarative_base()

class User(Base):
    __tablename__ = "user"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=True)
    phone_number = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=True)
    password = Column(String, nullable=False)
    role = Column(Enum(RoleEnum), default=RoleEnum.PENDING)
    status = Column(Enum(UserStatusEnum), default=UserStatusEnum.PENDING)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    company_id = Column(String, ForeignKey("company.id"), nullable=True)

    company = relationship("Company", back_populates="users")
    clients = relationship("Client", back_populates="user")
    flows = relationship("Flow", back_populates="user")
    integrations = relationship("Integration", back_populates="user")

class Company(Base):
    __tablename__ = "company"

    id = Column(String, primary_key=True)
    name = Column(String, unique=True, nullable=False)
    phone_number = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    users = relationship("User", back_populates="company")

class Client(Base):
    __tablename__ = "client"

    id = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey("user.id"), nullable=False)
    name = Column(String, nullable=False)
    phone_number = Column(String, unique=True, nullable=False)
    email = Column(String, nullable=True)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="clients")

class Flow(Base):
    __tablename__ = "flow"

    id = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey("user.id"), nullable=False)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    n8n_url = Column(String, nullable=False)
    active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    user = relationship("User", back_populates="flows")


class Integration(Base):
    __tablename__ = "integration"

    id = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey("user.id"), nullable=False)
    whatsapp_token = Column(String, nullable=False)
    phone_number_id = Column(String, nullable=False)
    business_name = Column(String, nullable=True)
    verified = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="integrations")
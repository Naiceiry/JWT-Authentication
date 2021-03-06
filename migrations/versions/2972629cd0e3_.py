"""empty message

Revision ID: 2972629cd0e3
Revises: 6bddf5114965
Create Date: 2022-01-19 16:22:23.793801

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2972629cd0e3'
down_revision = '6bddf5114965'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('email', sa.String(length=120), nullable=False))
    op.add_column('user', sa.Column('password', sa.String(length=80), nullable=False))
    op.drop_column('user', 'email_request')
    op.drop_column('user', 'password_request')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('password_request', sa.VARCHAR(length=80), autoincrement=False, nullable=False))
    op.add_column('user', sa.Column('email_request', sa.VARCHAR(length=120), autoincrement=False, nullable=False))
    op.drop_column('user', 'password')
    op.drop_column('user', 'email')
    # ### end Alembic commands ###
